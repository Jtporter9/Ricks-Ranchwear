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

    const kidSizes = [
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
    ];

    const adultSizes = [
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

    const inches = adultChart ? adultSizes : kidSizes;

    const inchesFraction = [
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
    ]
    const usMens = [
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
    ]
    const usWomens = [
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
    ]
    const EU = [
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
    ]
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

    const queryStrings = parse(location.search);

    return (
        <div>
            {console.log(queryStrings)}
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
                                    <th>CM</th>
                                    <th>Shop</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inches.map((value, i) => (
                                    <tr>
                                        {i % 2 === 0 ?
                                            <td className="inches-display">{value}<sup>{inchesFraction[i]}</sup></td> :
                                            <td className="even-dark-background ">{value}<sup>{inchesFraction[i]}</sup></td>
                                        }
                                        <td>{usMens[i]}</td>
                                        <td>{usWomens[i]}</td>
                                        <td>{EU[i]}</td>
                                        <td>{CM[i]}</td>
                                        <td>
                                            <Link to={`/${queryStrings.pageCategory}`}>Shop</Link>
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
