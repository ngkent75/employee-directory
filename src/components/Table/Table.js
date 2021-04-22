import { useEffect, useState } from 'react';
import API from '../../utils/API';
import { Table } from 'react-bootstrap';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const SortArrow = ({isAscending, size}) => {
    let sym = isAscending ? <FaSortUp size={size}/> : <FaSortDown size={size}/>
    return <>{sym}</>
};

const EmTable = ({filter}) => {
    const [initialEmployees, setInitialEmployees] = useState([]);
    const [sortName, setSortName] = useState('ascend');
    
    let getEmployees = async () => {
        let users = await API.getAllUsers();
        setInitialEmployees(users);
    };

    useEffect(() => {
        getEmployees()
    }, []);
    
    const fullName = employee => `${employee.name.first} ${employee.name.last}`;


    let employees = initialEmployees.filter((employee) => {
        const name = fullName(employee).toLowerCase()
        return name.startsWith(filter.toLowerCase())
    });

    const sortToggle = () => {
        if (sortName === 'ascend') {
            setSortName('descend')
        } else {
            setSortName('ascend')
        }
    };

    if(sortName === 'ascend') {
        employees = employees.sort((a, b)=>a.name.first > b.name.first ? 1 : -1)
    } else {
        employees = employees.sort((a, b)=>a.name.first > b.name.first ? -1 : 1)
    }

    

    return (
        <>
        <Table  striped bordered hover className='table ml-3'>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name <span onClick={sortToggle} style={{cursor: 'pointer'}}><SortArrow size={15} isAscending={sortName === 'asc'} /></span></th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => {
                    return <tr key={employee.email}>
                        <td><img src={employee.picture.medium} alt={fullName(employee)+"'s picture"}></img></td>
                        <td>{fullName(employee)}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.email}</td>
                        <td>{employee.id.value}</td>
                        </tr>
                })}
            </tbody>
        </Table>
        </>
    )
};

export default EmTable;