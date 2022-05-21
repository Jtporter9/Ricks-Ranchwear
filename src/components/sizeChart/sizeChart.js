// Node Modules
import React, {useState} from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import {parse} from 'query-string';

//ASSESTS
import CloseIconBlack from '../../assets/close-icon-black.svg';

export default function SizeChart(props) {

    const location = useLocation();
    const { activeSizeChart, setActiveSizeChart, defaultToAdult = true } = props;

    const [adultChart, setAdultChart] = useState(defaultToAdult ? true : false);


    // Adult size chart variables
    const adultInches = [
        '9',
        '9',
        '9',
        '9',
        '9',
        '10',
        '10',
        '10',
        '10',
        '10',
        '10',
        '11',
        '11',
        '11',
        '11',
        '12',
        '12'
    ];

    const adultInchesFractions = [
        '1/4',
        '1/2 ',
        '5/8',
        '3/4',
        '15/16',
        '1/8 ',
        '1/4 ',
        '7/16 ',
        '9/16',
        '3/4',
        '15/16',
        '1/8 ',
        '1/4',
        '9/16',
        '7/8',
        '3/16',
        '1/2'
    ];

    const adultUSMens = [
        6,
        6.5,
        7,
        7.5,
        8,
        8.5,
        9,
        9.5,
        10,
        10.5,
        11,
        11.5,
        12,
        13,
        14,
        15,
        16
    ];

    const adultUSWomens = [
        4,
        4.5,
        5,
        5.5,
        6,
        6.5,
        7,
        7.5,
        8,
        8.5,
        9,
        9.5,
        10,
        10.5,
        11,
        11.5,
        12
    ];

    const adultEU = [
        '39',
        '39',
        '40',
        '40 - 41',
        '41',
        '41 - 44',
        '42',
        '42 - 43',
        '43',
        '43 - 44',
        '44',
        '44 - 45',
        '45',
        '46',
        '47',
        '48',
        '49'
    ];

    const CM = [
        23.5,
        24.1,
        24.4,
        24.8,
        25.4,
        25.7,
        26,
        26.7,
        27,
        27.3,
        27.9,
        28.3,
        28.6,
        29.4,
        30.2,
        31,
        31.8
    ];

    // Kids size chart variables
    const kidsInches = [
        '4',
        '5',
        '5',
        '5',
        '5',
        '5',
        '5',
        '6',
        '6',
        '6',
        '6',
        '6',
        '6',
        '7',
        '7',
        '7',
        '7',
        '7',
        '7',
        '8',
        '8',
        '8',
        '8',
        '8',
        '9',
        '9',
        '9',
        '9',
        '9',
    ];

    const kidsInchesFractions = [
        '3/4',
        '',
        '1/8',
        '1/4',
        '1/2',
        '5/8',
        '3/4',
        '',
        '1/8',
        '1/4',
        '1/2',
        '5/8',
        '3/4',
        '',
        '1/8',
        '1/4',
        '1/2',
        '5/8',
        '3/4',
        '',
        '1/8',
        '1/2',
        '5/8',
        '3/4',
        '',
        '1/8',
        '1/4',
        '1/2',
        '5/8',
    ];

    const kidsToddlers = [
        '5',
        '5.5',
        '6',
        '6.5',
        '7',
        '7.5',
        '8',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
    ];

    const kidsChildren = [
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '8.5',
        '9',
        '9.5',
        '10',
        '10.5',
        '11',
        '11.5',
        '12',
        '12.5',
        '13',
        '13.5',
        '1',
        '1.5',
        '2',
        '2.5',
        '3',
        '-',
        '-',
        '-',
        '-',
        '-',
    ];

    const kidsYouth = [
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '3.5',
        '4',
        '4.5',
        '5',
        '5.5',
        '6*',
    ];

    const kidsEU = [
        '12.1',
        '12.7',
        '13',
        '13.3',
        '14',
        '14.3',
        '14.6',
        '15.2',
        '15.6',
        '15.9',
        '16.5',
        '16.8',
        '17.1',
        '17.8',
        '18.1',
        '18.4',
        '19',
        '19.4',
        '19.7',
        '20.1',
        '20.3',
        '21.6',
        '22',
        '22.2',
        '22.9',
        '23.2',
        '23.5',
        '24',
        '24.3',
    ];

    const inches = adultChart ? adultInches : kidsInches;
    const fractions = adultChart ? adultInchesFractions : kidsInchesFractions;
    const usMensSizes = adultChart ? adultUSMens : kidsToddlers;
    const usWomensSizes = adultChart ? adultUSWomens : kidsChildren;
    const EUSizes = adultChart ? adultEU : kidsYouth;

    const queryStrings = parse(location.search);

    return (
        <div>
            { activeSizeChart && (
                <div className="size-chart-modal-opaque-background">
                    <div className="size-chart-modal">
                        <span className="margin-block"/>
                        <div className="size-chart-head">
                            <h3>Size Chart</h3>
                            <img src={CloseIconBlack} alt="close icon" onClick={() => setActiveSizeChart(false)} />
                        </div>
                        <div className="chart-switcher">
                            <p
                              className={adultChart ? "active" : ""}
                              onClick={() => setAdultChart(true)}
                              tabIndex="0">Adult</p>
                            <p
                              className={adultChart ? "" : "active"}
                              onClick={() => setAdultChart(false)}
                              tabIndex="0">Kids</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>in</th>
                                    <th>{adultChart ? "US M" : "Toddler"}</th>
                                    <th>{adultChart ? "US W" : "Children"}</th>
                                    <th>{adultChart ? "EU" : "Youth"}</th>
                                    <th>CM</th>
                                    <th>Shop</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inches.map((value, i) => (
                                    <tr>
                                        {i % 2 === 0 ?
                                            <td className="inches-display">{value}<sup>{fractions[i]}</sup></td> :
                                            <td className="even-dark-background ">{value}<sup>{fractions[i]}</sup></td>
                                        }
                                        <td>{usMensSizes[i]}</td>
                                        <td>{usWomensSizes[i]}</td>
                                        <td>{EUSizes[i]}</td>
                                        <td>{adultChart ? CM[i] : kidsEU[i]}</td>
                                        <td>
                                            <Link to={`/${queryStrings.pageCategory ? queryStrings.pageCategory : "mens"}`}>Shop</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
