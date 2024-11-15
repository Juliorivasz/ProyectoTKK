import bannerImage from "../../assets/images/theKrustyKrab.jpg"
import './banner.css'

export default function Banner() {
    return (
        <div className='banner'>
            <div>
                <h3 className='banner-top-title'>
                    Bienvenido, Administrador
                </h3>
            </div>
            <img
                className='banner-img'
                src={bannerImage} alt="banner image bob esponja" />
        </div>
    )
}