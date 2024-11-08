import Image from "next/image";

export default function BankSampah()  {
    return (
        <>
        <div className="flex w-full gap-4 mb-4">
            <div className="flex h-[73px] w-[73px] items-center justify-center rounded-lg bg-hijau">
            <Image
                src="/images/banksampah.jpg"
                alt="Bank Sampah"
                className="rounded-md"
                width={63}
                height={63}
                objectFit="cover"
                objectPosition="center"
            />
            </div>
            <div className="flex-grow">
            <h3 className="mb-2 text-xs font-semibold">
                E-ling - Bank Sampah Siliwangi
            </h3>
            <h6 className="text-black_soft mb-2 text-xs">
                Jl. Sukamulya, RT.07/RW.03, Sukasari, Kec.
            </h6>
            <span className="me-2 rounded-full border border-hijau px-5 py-1 text-xs font-medium text-hijau focus:outline-none focus:ring-4 focus:ring-green-500">
                1,5 km
            </span>
            </div>
        </div>
        </>

    );
}