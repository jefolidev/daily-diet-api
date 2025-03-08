interface RadioCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  slugText: string
  checkedBgColor: string
  checkedBorderColor: string
}

export function Radio(props: RadioCustomProps) {
  return (
    <div className="relative w-full flex items-center justify-center py-4 ">
      <input
        type="radio"
        className={`hover:cursor-pointer absolute appearance-none  bg-zinc-200/80 rounded-md size-full checked:bg-${props.checkedBgColor} border-2 border-transparent checked:border-2 checked:border-${props.checkedBorderColor} z-0`}
        {...props}
      />

      <div className="flex gap-3 items-center ">
        <div className="size-3 rounded-full relative" />
        <label className="relative font-bold text-md ">{props.slugText}</label>
      </div>
    </div>
  )
}