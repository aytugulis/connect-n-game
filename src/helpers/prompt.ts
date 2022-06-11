import prompt from "prompt";

prompt.start();

interface GetPromptProps extends prompt.RevalidatorSchema {
  name: string;
}

export async function getPrompt({ name, ...rest }: GetPromptProps) {
  const res = await prompt.get([
    {
      name,
      /*       required: true,
      pattern: /^[a-zA-Z\s\-]+$/,
      message: "Value must be between 0 and 6 and it is required.", */
      ...rest,
    },
  ]);

  return res[name];
}
