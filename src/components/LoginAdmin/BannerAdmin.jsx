import bannerImage from "../../assets/images/theKrustyKrab.jpg";

export default function BannerAdmin() {
    return (
        <div className='relative'>
            <div className='absolute top-0 left-0 p-4'>
                <h3 className='text-2xl font-bold text-white'>
                    Bienvenido, Administrador
                </h3>
            </div>
            <img
                className='w-full h-auto'
                src={bannerImage} alt="banner image bob esponja" />
        </div>
    )
}