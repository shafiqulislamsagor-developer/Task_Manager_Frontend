import { ReusableForm } from "@/components/form/ReusableForm";

export default function page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[320px] md:max-w-[520px] w-full border rounded-sm bg-secondary flex flex-col items-center py-5">
        <h1 className="text-3xl font-bold text-center uppercase">Login</h1>
        <ReusableForm login />
      </div>
    </div>
  );
}
