import { Leave } from "../Types";
import { employeeApi } from "./employeeService";

/**
 * @description Injected endpoints for leave-related operations using RTK Query.
 */
export const leaveApi = employeeApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * @description Fetch all leave requests.
         * @returns {Leave[]} All leave entries.
         */
        getLeaves: builder.query<Leave[], void>({
            query: () => ({ url: "/leaves" }),
            providesTags: ["Leave"]
        }),

        /**
         * @description Submit a new leave request.
         * @param {Leave} intialLeave - Leave data to be submitted.
         * @returns {Leave} The submitted leave record.
         */
        submitLeave: builder.mutation<Leave, Leave>({
            query: (intialLeave) => ({
                url: "/leaves",
                method: "POST",
                body: intialLeave
            }),
            invalidatesTags: ["Leave"]
        }),

        /**
         * @description Get leave records for a specific user by email.
         * @param {string} email - Email of the user.
         * @returns {Leave[]} Leave records associated with the user.
         */
        getLeaveByUser: builder.query<Leave[], string>({
            query: (email) => ({
                url: `/leaves?email=${email}`
            }),
            providesTags: ["Leave"]
        }),

        /**
         * @description Get leave records for a manager's subordinates.
         * Filters the leaves by a list of employee emails.
         * @param {string[]} employeeEmails - List of employee emails managed by the manager.
         * @returns {Leave[]} Leave records matching the provided employee emails.
         */
        getLeaveByManager: builder.query<Leave[], string[]>({
            query: () => ({ url: "/leaves" }),
            transformResponse: (response: Leave[], meta, employeeEmails) => {
                return response.filter((leave) => employeeEmails.includes(leave.email));
            },
            providesTags: ["Leave"]
        }),

        /**
         * @description Update a leave record by its ID.
         * @param {Partial<Leave>} leave - Object containing `id` and fields to update.
         * @returns {Leave} The updated leave record.
         */
        updateLeaveById: builder.mutation<Leave, Partial<Leave>>({
            query: (leave) => {
                const { id, ...patch } = leave;
                return {
                    url: `/leaves/${id}`,
                    method: "PATCH",
                    body: patch
                };
            },
            invalidatesTags: ["Leave"]
        }),

        /**
         * @description Delete a leave record by ID.
         * @param {string} id - The ID of the leave record to delete.
         * @returns {Leave[]} Remaining leave records.
         */
        deleteLeavesById: builder.mutation<Leave[], string>({
            query: (id) => ({
                url: `/leaves/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Leave"]
        })
    })
});

export const {
    useSubmitLeaveMutation,
    useGetLeavesQuery,
    useLazyGetLeavesQuery,
    useGetLeaveByUserQuery,
    useLazyGetLeaveByUserQuery,
    useGetLeaveByManagerQuery,
    useUpdateLeaveByIdMutation,
    useDeleteLeavesByIdMutation
} = leaveApi;
