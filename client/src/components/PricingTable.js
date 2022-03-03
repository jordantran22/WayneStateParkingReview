import React from 'react';
import { parkingStructuresData } from '../data/parkingStructuresData';

const PricingTable = ({ parkingStructureInfo = parkingStructuresData }) => {
    return (
        <table className='pricing-table'>
            <caption><h2>Parking Rates</h2></caption>
            <thead>
                <tr>
                    <th></th>
                    <th>Semester<br />Permit</th>
                    <th>OneCard<br />Debit</th>
                    <th>Biweekly<br />Payroll<br />Deduction</th>
                    <th>Credit<br />Card</th>
                    <th>Cash</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Student</th>
                    <td>{parkingStructureInfo.studentParkingRates.semesterPermit}</td>
                    <td>{parkingStructureInfo.studentParkingRates.oneCardDebit}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <th>Faculty</th>
                    <td>{parkingStructureInfo.facultyAndStaffRates.semesterPermit}</td>
                    <td>{parkingStructureInfo.facultyAndStaffRates.oneCardDebit}</td>
                    <td>{parkingStructureInfo.facultyAndStaffRates.biweeklyPayrollDeduction}</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <th>Guest</th>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{parkingStructureInfo.creditCardRate}</td>
                    <td>{parkingStructureInfo.cash}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default PricingTable;