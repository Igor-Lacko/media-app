import RoundedButtonProps from "utils/props/control-elements/rounded-button-props";

/**
 * Returns a rounded button component.
 * @param props Properties for the rounded button, including text, click handler, extra classnames for styling and optional icon.
 */
export default function RoundedButton(props: RoundedButtonProps) {
	return (
		<div
			className={
				"flex items-center justify-center rounded-lg cursor-pointer transition-allduration-200\
                    duration-200 ease-in-out transform hover:scale-105 text-white\
                    p-2 text-lg " + props.extraClassNames
			}
			onClick={props.onClick}
		>
			<span>{props.text}</span>
			{props.icon && <div className={"ml-2"}>{props.icon}</div>}
		</div>
	);
}
