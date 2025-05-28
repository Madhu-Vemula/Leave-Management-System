import type React from "react";
import type { CardSectionProps } from "../../Types"; 

const CardSection: React.FC<CardSectionProps> = ({ title, children }: CardSectionProps) => {
    return (
        <div className="cardsection-container">
            <h2>{title}</h2>
            {children}
        </div>
    )
}
export default CardSection