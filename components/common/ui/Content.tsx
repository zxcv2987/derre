export default function Content({ content }: { content: string }) {
  return (
    <div className="flex flex-col flex-wrap whitespace-pre-wrap">
      {content.split("\n").map((line, index) => (
        <p key={index} className="text-zinc-700">
          {line}
        </p>
      ))}
    </div>
  );
}
