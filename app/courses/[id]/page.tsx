export default async function SingleCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <h1>Single course id: {id}</h1>
    </>
  );
}
