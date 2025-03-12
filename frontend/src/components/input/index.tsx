type InputCustomProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputCustomProps) {
  return <input className="rounded-sm border px-4 py-3" {...props} />
}
