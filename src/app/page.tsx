import Link from "next/link";

export default function Home() {
  return (
    <div>
      This is the home page <br />
      <Link href={"/user"}>
        <p className="w-fit p-1 bg-white text-black">User</p>{" "}
      </Link>
    </div>
  );
}
