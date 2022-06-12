import prompt from "prompt";

prompt.start();

interface GetPromptProps extends prompt.RevalidatorSchema {
  name: string;
}

export async function getPrompt({ name, ...rest }: GetPromptProps) {
  const res = await prompt.get([{ name, ...rest }]);

  return res[name];
}
