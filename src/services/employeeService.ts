import { Employee } from "../Types";
import rootApi from "./rootService";

/**
 * @description RTK Query API slice for managing Employee-related API calls.
 */
export const employeeApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * @description Fetch all employees.
         * @returns {Employee[]} List of all employees.
         */
        getEmployees: builder.query<Employee[], void>({
            query: () => ({
                url: "/employees"
            }),
            providesTags: ["Employee"]
        }),

        /**
         * @description Add a new employee.
         * @param {Employee} intialEmployee - The employee data to add.
         * @returns {Employee} The newly created employee.
         */
        addEmployee: builder.mutation<Employee, Employee>({
            query: (intialEmployee) => ({
                url: "/employees",
                method: "POST",
                body: intialEmployee
            }),
            invalidatesTags: ["Employee"]
        }),

        /**
         * @description Get employees reporting to a specific manager by their email.
         * @param {string} managerEmail - The email of the manager.
         * @returns {Employee[]} Employees under the manager.
         */
        getEmployeesByManager: builder.query<Employee[], string>({
            query: (managerEmail) => ({
                url: `/employees/?managerEmail=${managerEmail}`
            }),
            providesTags: ["Employee"]
        }),

        /**
         * @description Update an employee's information.
         * @param {Employee} intialEmployee - The employee data to update.
         * @returns {Employee} The updated employee.
         */
        updateEmployee: builder.mutation<Employee, Employee>({
            query: (intialEmployee) => ({
                url: `/employees/${intialEmployee.id}`,
                method: "PUT",
                body: intialEmployee
            }),
            invalidatesTags: ["Employee"]
        }),

        /**
         * @description Remove an employee by ID.
         * @param {string | undefined} id - The ID of the employee to remove.
         * @returns {Employee} The deleted employee.
         */
        removeEmployee: builder.mutation<Employee, string | undefined>({
            query: (id) => ({
                url: `/employees/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Employee"]
        }),

        /**
         * @description Get all employees with the role of manager.
         * @returns {Employee[]} List of managers.
         */
        getAllManagers: builder.query<Employee[], void>({
            query: () => ({
                url: `/employees/?role=manager`
            }), 
            providesTags:["Employee"]
        }),

        /**
         * @description Get employee by email.
         * @param {string} email - The email of the employee.
         * @returns {Employee[]} Matching employee(s).
         */
        getEmployeeByMail: builder.query<Employee[], string>({
            query: (email) => ({
                url: `/employees/?email=${email}`
            }),
            providesTags: ["Employee"]
        })
    })
});

export const {
    useAddEmployeeMutation,
    useGetEmployeesQuery,
    useUpdateEmployeeMutation,
    useRemoveEmployeeMutation,
    useGetEmployeesByManagerQuery,
    useGetAllManagersQuery,
    useLazyGetEmployeeByMailQuery,
    useGetEmployeeByMailQuery
} = employeeApi;
