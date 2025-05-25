import { ChangeEvent, useState } from "react"
import { ManagerDropDownProps } from "../../Types"


/**
 * A React functional component that renders a dropdown for selecting a manager's email.
 * It includes a search input field to filter manager emails and displays a list of matching results.
 *
 * @component
 * @param {ManagerDropDownProps} props - The props for the ManagerDropDown component.
 * @param {Array<{ id: string, email: string }>} props.managerData - An array of manager data objects containing `id` and `email`.
 * @param {(email: string) => void} props.onSelect - A callback function triggered when a manager email is selected.
 *
 * @returns {JSX.Element} The rendered ManagerDropDown component.
/** */

const ManagerDropDown: React.FC<ManagerDropDownProps> = (props) => {
    const { managerData, onSelect, initialManagerMail } = props
    const [searchTerm, setSearchTerm] = useState<string>(initialManagerMail)
    const [showManagerEmails, setShowManagerEmails] = useState<boolean>(false)
    const filteredManagerData = managerData.filter((item) => (
        item.email.toLowerCase().includes(searchTerm)
    ))
    /**
     * Handles the change event for the manager email input field.
     * Updates the search term state with the current value of the input field.
     *
     * @param event - The change event triggered by the input field.
     */
    const handleManagerMail = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value)
    }

    const handleBlurOfInput = () => {
        setShowManagerEmails(false)
        if (filteredManagerData.length === 0) onSelect("")
    }

    return (
        <div className="manager-emails-container">
            <input
                type="text"
                placeholder="Enter manager mail"
                value={searchTerm}
                onChange={(e) => handleManagerMail(e)}
                onFocus={() => setShowManagerEmails(true)}
                onBlur={() => handleBlurOfInput()}
            />
            {showManagerEmails && (
                <ul className="manager-emails">
                    {filteredManagerData.length === 0 ? (
                        <li>No results</li>
                    ) :
                        filteredManagerData.map((item) => (
                            <li key={item.id}
                                onMouseDown={() => {
                                    setSearchTerm(item.email)
                                    onSelect(item.email)
                                    setShowManagerEmails(false)
                                }}
                            >
                                {item.email}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}

export default ManagerDropDown