interface RadioCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  slugText: string
  customClass: string
}

export function Radio(props: RadioCustomProps) {
  return (
    <div className="relative flex w-full items-center justify-center py-4">
      <input
        type="radio"
        className={`absolute size-full appearance-none rounded-md bg-zinc-200/80 hover:cursor-pointer ${props.customClass} z-0 border-2 border-transparent checked:border-2`}
        {...props}
      />

      <div className="flex items-center gap-3">
        <div className="relative size-3 rounded-full" />
        <label className="text-md relative font-bold">{props.slugText}</label>
      </div>
    </div>
  )
}
