export const camelize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_./g, (m) => m.toUpperCase())
    .replace(/_/g, '')
};

export const readStream = (body: ReadableStream) => {
  const reader = body.getReader();

  return new ReadableStream({
    start(controller) {
      const push = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          push();
        })
      }

      push();
    }
  });
}
