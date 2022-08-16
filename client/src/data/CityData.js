
// export const CityData = [
//     "01 - Thành phố Hà Nội",
//     "02 - Tỉnh Hà Giang",
//     "04 - Tỉnh Cao Bằng",
//     "06 - Tỉnh Bắc Kạn",
//     "08 - Tỉnh Tuyên Quang",
//     "10 - Tỉnh Lào Cai",
//     "11 - Tỉnh Điện Biên"
// ];

import { useEffect, useState } from "react";

export const CityData = () => {
    const [bio, setBio] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://cb-be.azurewebsites.net/storage/get_city_province');
            const data = await response.json();
            setBio(data.rows);
        };
        fetchData();
    }, []);
    return bio;

}