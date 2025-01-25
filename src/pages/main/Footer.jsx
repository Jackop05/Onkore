import React from 'react'

const Footer = () => {
  return (
    <div id="footer" className="bg-[url('/images/footer.png')] bg-cover bg-center w-full h-[300px] text-white relative">
        <div className='bg-black/70 w-full h-full px-20 flex justify-between'>
            <div className='flex flex-col justify-center gap-4 text-2xl'>
                <a href="https://facebook.com" target="_blank" class="flex items-center space-x-2 text-blue-600 hover:underline">
                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H8.282v-2.888h2.156V9.797c0-2.138 1.278-3.319 3.233-3.319.936 0 1.915.171 1.915.171v2.096h-1.079c-1.063 0-1.394.662-1.394 1.34v1.609h2.377l-.38 2.888h-1.997v6.99C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                    <span>Facebook</span>
                </a>

                <a href="https://instagram.com" target="_blank" class="flex items-center space-x-2 text-pink-600 hover:underline">
                    <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.345 3.608 1.32.975.975 1.258 2.242 1.32 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.345 2.633-1.32 3.608-.975.975-2.242 1.258-3.608 1.32-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.345-3.608-1.32-.975-.975-1.258-2.242-1.32-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.345-2.633 1.32-3.608.975-.975 2.242-1.258 3.608-1.32C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.015 7.052.072 5.772.128 4.637.444 3.678 1.403.719 2.362.403 3.497.347 4.777.29 6.058.275 6.467.275 12s.015 5.942.072 7.223c.056 1.28.372 2.415 1.331 3.374.96.959 2.095 1.275 3.375 1.331C8.332 23.985 8.741 24 12 24s3.668-.015 4.948-.072c1.28-.056 2.415-.372 3.375-1.331.959-.96 1.275-2.095 1.331-3.374.057-1.281.072-1.69.072-7.223s-.015-5.942-.072-7.223c-.056-1.28-.372-2.415-1.331-3.375-.96-.959-2.095-1.275-3.375-1.331C15.668.015 15.259 0 12 0z"/>
                    <circle cx="12" cy="12" r="3.6"/>
                    <circle cx="18.406" cy="5.595" r="1.439"/>
                    </svg>
                    <span>Instagram</span>
                </a>

                <a href="https://pinterest.com" target="_blank" class="flex items-center space-x-2 text-red-600 hover:underline">
                    <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0C5.372 0 0 5.372 0 12c0 4.99 3.657 9.128 8.438 9.878-.114-.84-.218-2.126.046-3.047.237-.869 1.526-5.529 1.526-5.529s-.391-.782-.391-1.94c0-1.816 1.053-3.175 2.365-3.175 1.115 0 1.651.836 1.651 1.837 0 1.118-.711 2.788-1.08 4.336-.307 1.296.654 2.355 1.94 2.355 2.328 0 4.115-2.455 4.115-5.994 0-3.131-2.256-5.316-5.482-5.316-3.737 0-5.927 2.803-5.927 5.701 0 1.138.432 2.361 1.002 3.025a.405.405 0 01.094.387c-.102.426-.331 1.346-.375 1.538-.059.251-.191.305-.442.184-1.647-.77-2.681-3.192-2.681-5.144 0-4.187 3.043-8.029 8.777-8.029 4.606 0 8.192 3.29 8.192 7.683 0 4.572-2.885 8.273-6.889 8.273-1.346 0-2.612-.697-3.044-1.518 0 0-.727 2.887-.895 3.441-.264.908-.78 1.819-1.251 2.539A11.975 11.975 0 0012 24C18.628 24 24 18.628 24 12S18.628 0 12 0z"/>
                    </svg>
                    <span>Pinterest</span>
                </a>
            </div>

            <div className='text-3xl flex flex-col justify-center'>
                <div className="flex justify-center gap-8 mb-2 font-roboto text-lg tracking-wider">
                    <a href="/privacy-policy" class="">Privacy Policy</a>
                    <a href="/terms-of-service" class="">Terms of Service</a>
                    <a href="/cookie-policy" class="">Cookie Policy</a>
                </div>
                <div class="text-center text-xs">
                    &copy; 2024 Onkore. All rights reserved.
                </div>
            </div>

            <div className='flex flex-col justify-center gap-4 text-lg'>
                <div className=''>
                    <div className='text-2xl'>Email</div>
                    <div className=' italic'>● OnkoreInfo@gmail.com</div>
                </div>
                <div className=''>
                    <div className='text-2xl'>Kontakt</div>
                    <div className=' italic'>● 696 100 061</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer