function Logo({ width = '100px', transparent = false }) {
    return <div style={{ width }}><img className='rounded-xl' src={transparent ? '../public/logo_2.png' : '../public/logo.png'} alt="life's mosaic" /></div>
}

export default Logo;