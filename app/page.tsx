import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="hero">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">
       Track all your todo tasks at one please
      </p>
      <Link href='/login' className="btn btn-soft bg-foreground hover:bg-foreground-light">Login to continue</Link>
    </div>
  </div>
</div>
  );
}
