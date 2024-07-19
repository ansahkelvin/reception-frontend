import Image from "next/image";


const Success = async () => {
    return (
        <div className={"flex flex-col justify-center items-center h-screen w-screen"}>
            <Image src={'/undraw_verified_re_4io7.svg'} alt={'success'} height={500} width={500}/>
        </div>
    )
}



export default Success