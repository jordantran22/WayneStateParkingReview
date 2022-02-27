import React from 'react';

const SearchBar = () => {
    return (
        <div class="search-bar">
            <div class="search-box">
                <input id="search" maxlength="50" type="text" placeholder="Search for parking"/>
            </div>
            <button class="search-btn">
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-outside-1_6_324" maskUnits="userSpaceOnUse" x="-2.41421" y="-3.31371" width="29.6985" height="29.6985" fill="black">
                        <rect fill="white" x="-2.41421" y="-3.31371" width="29.6985" height="29.6985" />
                    </mask>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.435 4.46447C14.3877 6.41709 14.3877 9.58291 12.435 11.5355C10.4824 13.4882 7.31658 13.4882 5.36396 11.5355C3.41134 9.58291 3.41134 6.41709 5.36396 4.46447C7.31658 2.51184 10.4824 2.51184 12.435 4.46447ZM14.5047 12.1945C16.5619 9.45257 16.3434 5.54445 13.8492 3.05025C11.1156 0.316583 6.68342 0.316582 3.94975 3.05025C1.21608 5.78392 1.21608 10.2161 3.94975 12.9497C6.44394 15.4439 10.3521 15.6624 13.094 13.6052C13.1093 13.6229 13.1254 13.6401 13.1421 13.6569L19.5061 20.0208C19.8966 20.4113 20.5298 20.4113 20.9203 20.0208C21.3108 19.6303 21.3108 18.9971 20.9203 18.6066L14.5563 12.2426C14.5396 12.2259 14.5224 12.2098 14.5047 12.1945Z" fill="#0F594E" />
                    <path d="M14.5047 12.1945L13.7048 11.5944L13.1465 12.3385L13.8485 12.9491L14.5047 12.1945ZM13.094 13.6052L13.8485 12.949L13.238 12.247L12.4938 12.8053L13.094 13.6052ZM13.1421 12.2426C15.4853 9.89949 15.4853 6.10051 13.1421 3.75736L11.7279 5.17157C13.29 6.73367 13.29 9.26633 11.7279 10.8284L13.1421 12.2426ZM4.65685 12.2426C7 14.5858 10.799 14.5858 13.1421 12.2426L11.7279 10.8284C10.1658 12.3905 7.63316 12.3905 6.07107 10.8284L4.65685 12.2426ZM4.65685 3.75736C2.31371 6.1005 2.31371 9.8995 4.65685 12.2426L6.07107 10.8284C4.50897 9.26633 4.50897 6.73367 6.07107 5.17157L4.65685 3.75736ZM13.1421 3.75736C10.799 1.41421 7 1.41421 4.65685 3.75736L6.07107 5.17157C7.63316 3.60948 10.1658 3.60948 11.7279 5.17157L13.1421 3.75736ZM15.3046 12.7946C17.6563 9.66025 17.4075 5.19426 14.5563 2.34315L13.1421 3.75736C15.2794 5.89463 15.4676 9.24489 13.7048 11.5944L15.3046 12.7946ZM14.5563 2.34315C11.4322 -0.781048 6.36684 -0.781049 3.24264 2.34315L4.65685 3.75736C7 1.41421 10.799 1.41421 13.1421 3.75736L14.5563 2.34315ZM3.24264 2.34315C0.118446 5.46734 0.118446 10.5327 3.24264 13.6569L4.65685 12.2426C2.31371 9.89949 2.31371 6.10051 4.65685 3.75736L3.24264 2.34315ZM3.24264 13.6569C6.09375 16.508 10.5597 16.7568 13.6941 14.4051L12.4938 12.8053C10.1444 14.5681 6.79413 14.3799 4.65685 12.2426L3.24264 13.6569ZM13.8492 12.9497C13.8489 12.9494 13.8487 12.9491 13.8485 12.949L12.3394 14.2615C12.37 14.2966 12.4018 14.3308 12.435 14.364L13.8492 12.9497ZM20.2132 19.3137L13.8492 12.9497L12.435 14.364L18.799 20.7279L20.2132 19.3137ZM20.2132 19.3137L18.799 20.7279C19.58 21.509 20.8464 21.509 21.6274 20.7279L20.2132 19.3137ZM20.2132 19.3137L21.6274 20.7279C22.4085 19.9469 22.4085 18.6805 21.6274 17.8995L20.2132 19.3137ZM13.8492 12.9497L20.2132 19.3137L21.6274 17.8995L15.2635 11.5355L13.8492 12.9497ZM13.8485 12.9491C13.8486 12.9492 13.8489 12.9494 13.8492 12.9497L15.2635 11.5355C15.2303 11.5024 15.1961 11.4705 15.161 11.4399L13.8485 12.9491Z" fill="#0F594E" mask="url(#path-1-outside-1_6_324)" />
                </svg>

            </button>
        </div>
    )
};

export default SearchBar