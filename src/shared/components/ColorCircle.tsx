export function ColorCircle(props: { color: string}) {
  return  <div
    aria-hidden="true"
    style={{backgroundColor: props.color}}
    className={'h-8 w-8 border border-black border-opacity-10 rounded-full'}
  />
}
