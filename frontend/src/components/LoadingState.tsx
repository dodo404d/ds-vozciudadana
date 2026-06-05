export function LoadingState({ text = 'Cargando información...' }: { text?: string }) {
  return <div className="panel muted-panel">{text}</div>;
}
