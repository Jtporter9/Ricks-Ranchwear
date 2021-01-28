import React from 'react'

//ASSESTS
import CloseIconBlack from '../../assets/close-icon-black.svg';

export default function SizeChart(props) {
    const { activeSizeChart, setActiveSizeChart } = props
    const inches = [
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
    ]
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
    ]

    return (
        <div>
            { activeSizeChart && (
                <div className="size-chart-modal-opaque-background">
                    <div className="size-chart-modal">
                        <div className="size-chart-head">
                            <h3>Size Chart</h3>
                            <img src={CloseIconBlack} alt="close icon" onClick={() => setActiveSizeChart(false)} />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>in</th>
                                    <th>US M</th>
                                    <th>US W</th>
                                    <th>EU</th>
                                    <th>CM</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inches.map((value, i) => (
                                    <tr>
                                        {i % 2 === 0 ?
                                            <td>{value}<sup>{inchesFraction[i]}</sup></td> :
                                            <td className="even-dark-background">{value}<sup>{inchesFraction[i]}</sup></td>
                                        }
                                        <td>{usMens[i]}</td>
                                        <td>{usWomens[i]}</td>
                                        <td>{EU[i]}</td>
                                        <td>{CM[i]}</td>
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
