// import img1 from "@/public/images/Employee/emp1.png"

export default function EmployeeTable() {
    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="flex-1 flex items-center gap-[10px] border border-[#E9EAEC] rounded-xl px-[20px] py-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.80547 2.93994C6.01378 2.93994 2.94 6.01372 2.94 9.80541C2.94 13.5971 6.01378 16.6709 9.80547 16.6709C13.5972 16.6709 16.6709 13.5971 16.6709 9.80541C16.6709 6.01372 13.5972 2.93994 9.80547 2.93994ZM1.69 9.80541C1.69 5.32336 5.32342 1.68994 9.80547 1.68994C14.2875 1.68994 17.9209 5.32336 17.9209 9.80541C17.9209 14.2875 14.2875 17.9209 9.80547 17.9209C5.32342 17.9209 1.69 14.2875 1.69 9.80541Z" fill="#1D1F2C" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5727 14.9628C14.8165 14.7184 15.2122 14.7179 15.4566 14.9617L18.3933 17.8907C18.6377 18.1345 18.6382 18.5302 18.3944 18.7746C18.1507 19.019 17.7549 19.0195 17.5106 18.7758L14.5739 15.8467C14.3295 15.6029 14.329 15.2072 14.5727 14.9628Z" fill="#1D1F2C" />
                    </svg>
                    <input type="text" name="" id="" placeholder="Search employee" className="w-full text-[14px] placeholder:text-[#A0AEC0] text-[#1D1F2C] outline-none" />
                </div>
                <div>
                    <div className="flex  items-center gap-[10px] px-[20px] py-[16px] border rounded-xl border-[#E9EAEC] text-[#1D1F2C] text-[14px] font-medium cursor-pointer">
                        <span>All Job Titles</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.4107 6.91058C4.73614 6.58514 5.26378 6.58514 5.58921 6.91058L9.99996 11.3213L14.4107 6.91058C14.7361 6.58514 15.2638 6.58514 15.5892 6.91058C15.9147 7.23602 15.9147 7.76366 15.5892 8.08909L10.5892 13.0891C10.2638 13.4145 9.73614 13.4145 9.4107 13.0891L4.4107 8.08909C4.08527 7.76366 4.08527 7.23602 4.4107 6.91058Z" fill="#1D1F2C" />
                        </svg>
                    </div>
                </div>
                <div>
                    <div className="flex  items-center gap-[10px] px-[20px] py-[16px] border rounded-xl border-[#E9EAEC] text-[#1D1F2C] text-[14px] font-medium cursor-pointer">
                        <span>All Status</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.4107 6.91058C4.73614 6.58514 5.26378 6.58514 5.58921 6.91058L9.99996 11.3213L14.4107 6.91058C14.7361 6.58514 15.2638 6.58514 15.5892 6.91058C15.9147 7.23602 15.9147 7.76366 15.5892 8.08909L10.5892 13.0891C10.2638 13.4145 9.73614 13.4145 9.4107 13.0891L4.4107 8.08909C4.08527 7.76366 4.08527 7.23602 4.4107 6.91058Z" fill="#1D1F2C" />
                        </svg>
                    </div>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Hours Rate</th>
                        <th>Recorded Hours</th>
                        <th>Earning</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>
                                <img src="@/public/images/Employee/emp1.png" alt="" />
                                <h3>Ronald Richards</h3>
                            </td>
                            <td>Baker</td>
                            <td>$10</td>
                            <td>160</td>
                            <td>$1600</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>
                                <img src="@/public/images/Employee/emp1.png" alt="" />
                                <h3>Ronald Richards</h3>
                            </td>
                            <td>Baker</td>
                            <td>$10</td>
                            <td>160</td>
                            <td>$1600</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>
                                <img src="@/public/images/Employee/emp1.png" alt="" />
                                <h3>Ronald Richards</h3>
                            </td>
                            <td>Baker</td>
                            <td>$10</td>
                            <td>160</td>
                            <td>$1600</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>
                                <img src="@/public/images/Employee/emp1.png" alt="" />
                                <h3>Ronald Richards</h3>
                            </td>
                            <td>Baker</td>
                            <td>$10</td>
                            <td>160</td>
                            <td>$1600</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>
                                <img src="@/public/images/Employee/emp1.png" alt="" />
                                <h3>Ronald Richards</h3>
                            </td>
                            <td>Baker</td>
                            <td>$10</td>
                            <td>160</td>
                            <td>$1600</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>
                                <img src="@/public/images/Employee/emp1.png" alt="" />
                                <h3>Ronald Richards</h3>
                            </td>
                            <td>Baker</td>
                            <td>$10</td>
                            <td>160</td>
                            <td>$1600</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>
                                <img src="@/public/images/Employee/emp1.png" alt="" />
                                <h3>Ronald Richards</h3>
                            </td>
                            <td>Baker</td>
                            <td>$10</td>
                            <td>160</td>
                            <td>$1600</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}