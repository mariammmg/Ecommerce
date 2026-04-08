
import Payment from "../Payment";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
  return (
    <div>
      <Payment id={id}></Payment>
    </div>
  );
}
