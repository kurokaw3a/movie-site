export const Select = (props) => {
    const languageSelect = "outline-none bg-transparent text-white cursor-pointer"
    return <select onChange={props.onChange} className={props.variant === "language" ? languageSelect : ""}>{props.children}</select>
}