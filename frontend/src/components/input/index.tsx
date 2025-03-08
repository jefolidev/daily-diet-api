type InputCustomProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputCustomProps) {
  return (
    <input className="border rounded-sm py-3 px-4" {...props} />
  )
}