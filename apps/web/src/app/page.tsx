import { Button, Alert, Input, Spinner, TextArea } from "@devsozluk/ui";

export default function Page() {
  return (
    <div className="flex flex-col max-w-2xl gap-5">
      <TextArea placeholder="Your Comment" rows={4} label="test">
        <TextArea.Actions>
          <Button size="sm" loading>
            Send
          </Button>
        </TextArea.Actions>
      </TextArea>
    </div>
  );
}
