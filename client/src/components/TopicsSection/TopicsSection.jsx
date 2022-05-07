import React, { Component } from 'react';
import navlist from './navlist.json';
import launchContestsItems from './launchContestsItems.json';
import marketplaces from './marketplaces.json';
import managedItems from './managedItems.json';
import creativesItems from './creativesItems.json';
import styles from './TopicsSection.module.sass';

export default class TopicsSection extends Component {
    constructor(props) {
        super(props);
        this.onClickStyleChange = this.onClickStyleChange.bind(this);
      }
    
    onClickStyleChange (elem1, elem2) {
        let div = document.getElementById(elem1);
        let span = document.getElementById(elem2);
    
        if(div.style.display !== "none"){
          div.style.display = "none";
          span.className = styles.spanContainer;
        } else {
          div.style.display = "block";
          span.className = styles.spanContainer2;
        }
      }

    render() {
        return (
            <div className={styles.launchDivContainer}>
                <div className={styles.launchSubContainer}>
                    <div className={styles.navContainer}>
                        <nav className={styles.navStyle}>
                            <ul className={styles.ulstyle}>
                                {navlist.map((list, i) => (
                                    <li key={i}>
                                        <a className={styles.aListStyle} href={list.href}>{list.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.mainTextContainer}>
                        <div id="contests" className={styles.contestsDivStyle}>
                            <div className={styles.contestHeadLine}>
                                <h3>Launching A Contest</h3>
                            </div>
                            <div>
                                {launchContestsItems.map((item, id) => (
                                    <div key={id} className={styles.itemContainer}>
                                        <div className={styles.itemHeader}>
                                            <h5>
                                                <button className={styles.btnStyle} onClick={() => {this.onClickStyleChange(item.divId, item.spanId)}}>
                                                    {item.buttonText}
                                                    <span id={item.spanId} className={styles.spanContainer}>
                                                        <span class="fas fa-arrow-down small"></span>
                                                    </span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id={item.divId} className={styles.collapse}>
                                            <div className={styles.itemCard}>
                                                {item.itemCardText}
                                                {id===3 &&
                                                    (
                                                        <ul className={styles.ulstyle2}>
                                                            {item.listItems.map((i, id) =>(
                                                                <li key={id} className={styles.liStyle}>
                                                                    {i.text}
                                                                    {id===2 && (
                                                                        <a className={styles.aStyle} href={i.ahreference}>{i.aText}</a>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )
                                                }
                                                {(id===4 || id===5) &&
                                                    (
                                                        <a className={styles.aStyle} href={item.ahreference}>{item.aText}</a>
                                                    )
                                                }
                                                {id===8 && 
                                                    (
                                                        <ul className={styles.ulstyle2}>
                                                        {item.references.map((r, id) =>(
                                                            <li key={id} className={styles.liStyle}>
                                                                <a className={styles.aStyle} href={r.ahreference}>{r.aText}</a>
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))} 
                            </div>
                        </div>
                        <hr />
                        <div id="marketplace" className={styles.contentContainer}>
                            <div className={styles.headerDivStyle}>
                                <h3>Buying From Marketplace</h3>
                            </div>
                            <div>
                                {marketplaces.map((item, id) => (
                                    <div key={id} className={styles.itemContainer}>
                                        <div className={styles.itemHeader}>
                                            <h5>
                                                <button className={styles.btnStyle} onClick={() => {this.onClickStyleChange(item.divId, item.spanId)}}>
                                                    {item.buttonText}
                                                    <span id={item.spanId} className={styles.spanContainer}>
                                                    <span class="fas fa-arrow-down small"></span>
                                                    </span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id={item.divId} className={styles.collapse}>
                                            <div className={styles.itemCard}>
                                                {item.itemCardText}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div id="managed" className={styles.contentContainer}>
                            <div className={styles.headerDivStyle}>
                                <h3>Managed Contests</h3>
                            </div>
                            <div>
                                {managedItems.map((item, id) => (
                                    <div key={id} className={styles.itemContainer}>
                                        <div className={styles.itemHeader}>
                                            <h5>
                                                <button className={styles.btnStyle} onClick={() => {this.onClickStyleChange(item.divId, item.spanId)}}>
                                                    {item.buttonText}
                                                    <span id={item.spanId} className={styles.spanContainer}>
                                                    <span class="fas fa-arrow-down small"></span>
                                                    </span>
                                                </button>
                                            </h5>
                                        </div>
                                            {id===0 &&
                                                (
                                                    <div id={item.divId} className={styles.collapse}>
                                                        <div className={styles.itemCard}>
                                                            <p>{item.p1}</p>
                                                            <p>{item.p2}</p>
                                                            <p>{item.p3}
                                                                <span>
                                                                    <a className={styles.aStyle} href={item.areference}>{item.atext}</a>
                                                                </span>
                                                            </p>

                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {id===1 &&
                                                (
                                                    <div id={item.divId} className={styles.collapse}>
                                                        <div className={styles.itemCard}>
                                                            {item.itemCardText}
                                                            <ul>
                                                                {item.lists.map((list, id) => (
                                                                    <li key={id} className={styles.liStyle}>{list.text}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {id===2 &&
                                                (
                                                    <div id={item.divId} className={styles.collapse}>
                                                        <div className={styles.itemCard}>
                                                            {item.itemCardText}
                                                            <ul>
                                                                {item.lists.map((item, id) => (
                                                                    <li key={id} className={styles.liStyle}>
                                                                        {item.text}
                                                                        {id===3 && (
                                                                            <span>
                                                                                <a className={styles.aStyle} href={item.areference}>{item.atext}</a><span>{item.text2}</span>
                                                                            </span>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {id===3 &&
                                                (
                                                    <div id={item.divId} className={styles.collapse}>
                                                        <div className={styles.itemCard}>
                                                            {item.itemCardText}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                    </div>
                                ))}

                            </div>
                        </div>
                        <hr />
                        <div id="creatives" className={styles.forCreativesContainer}>
                            <div className={styles.headerDivStyle}>
                                <h3>For Creatives</h3>
                            </div>
                            <div>
                                {creativesItems.map((item, id) => (
                                    <div key={id} className={styles.itemContainer}>
                                        <div className={styles.itemHeader}>
                                            <h5>
                                                <button className={styles.btnStyle} onClick={() => {this.onClickStyleChange(item.divId, item.spanId)}}>
                                                    {item.buttonText}
                                                    <span id={item.spanId} className={styles.spanContainer}>
                                                        <span class="fas fa-arrow-down small"></span>
                                                    </span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id={item.divId} className={styles.collapse}>
                                            <div className={styles.itemCard}>
                                                {item.itemCardText}
                                                {id===0 && (
                                                    <span><a className={styles.aStyle} href={item.areference}>{item.atext}</a>
                                                    {item.itemCardText2}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}

