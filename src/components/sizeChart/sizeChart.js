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
        '3',
        '3',
        '4',
        '4',
        '4',
        '5',
        '5',
        '5',
        '6',
        '6',
        '6',
        '7',
        '7',
        '7',
        '8',
        '8',
        '8',
        '9',
        '9',
        '9',
    ];

    const kidsInchesFractions = [
        '1/2',
        '3/4 ',
        '1/8',
        '1/2',
        '3/4',
        '1/8',
        '1/2',
        '3/4',
        '1/8',
        '1/2',
        '3/4',
        '1/8',
        '1/5',
        '3/4',
        '1/8',
        '5/8',
        '7/8',
        '1/4',
        '5/8',
        '7/8',
    ];

    const kidsUSMens = [
        '1C',
        '2C',
        '3C',
        '4C',
        '5C',
        '6C',
        '7C',
        '8C',
        '9C',
        '10C',
        '11C',
        '12C',
        '13C',
        '1Y',
        '2Y',
        '3Y',
        '4Y',
        '5Y',
        '6Y',
        '7Y',
    ];

    const kidsUSWomens = [
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
        '5',
        '6',
        '7',
        '8',
        '9',
    ];

    const kidsEU = [
        '8.9',
        '9.5',
        '10.5',
        '11.4',
        '12.1',
        '13',
        '14',
        '14.6',
        '15.6',
        '16.5',
        '17.1',
        '18.1',
        '19.1',
        '19.7',
        '20.6',
        '21.8',
        '22.6',
        '23.5',
        '24.3',
        '25.2',
    ];

    const kidsAge = [
        '1-3 m',
        '3-6 m',
        '6-9 m',
        '10-12 m',
        '15-18 m',
        '1.5-2 y',
        '2-2.5 y',
        '3-4 y',
        '4-4.5 y',
        '5 y',
        '5-5.5 y',
        '5.5-6 y',
        '7 y',
        '8 y',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
    ];

    const inches = adultChart ? adultInches : kidsInches;
    const fractions = adultChart ? adultInchesFractions : kidsInchesFractions;
    const usMensSizes = adultChart ? adultUSMens : kidsUSMens;
    const usWomensSizes = adultChart ? adultUSWomens : kidsUSWomens;
    const EUSizes = adultChart ? adultEU : kidsEU;

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
                                    <th>US M</th>
                                    <th>US W</th>
                                    <th>EU</th>
                                    <th>{adultChart ? "CM" : "AGE"}</th>
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
                                        <td>{adultChart ? CM[i] : kidsAge[i]}</td>
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
