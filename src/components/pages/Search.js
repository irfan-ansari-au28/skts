import { useEffect } from "react";
import styles from "./Search.module.css";

const Search = () => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div className={styles.search}>
      <div className={styles.headerusers}>
        <div className={styles.parent}>
          <b className={styles.b}>08</b>
          <div className={styles.invitesPending}>Invites Pending</div>
        </div>
        <div className={styles.group}>
          <b className={styles.b1}>12</b>
          <div className={styles.invitesAccepted}>Invites Accepted</div>
        </div>
        <b className={styles.users}>Convert Lead</b>
      </div>
      <div className={styles.menu}>
        <div className={styles.bg} />
        <div className={styles.baseComponentBackgroundT}>
          <div className={styles.navItem} />
          <img
            className={styles.component10Icon}
            loading="lazy"
            alt=""
            src="/component-10.svg"
          />
        </div>
        <div className={styles.baseComponentBackgroundTParent}>
          <div className={styles.baseComponentBackgroundT1}>
            <div className={styles.navItem1} />
            <img
              className={styles.component10Icon1}
              loading="lazy"
              alt=""
              src="/component-10-1.svg"
            />
          </div>
          <div className={styles.baseComponentBackgroundT2}>
            <div className={styles.navItem2} />
            <img className={styles.component10Icon2} alt="" />
            <img
              className={styles.icons}
              loading="lazy"
              alt=""
              src="/icons.svg"
            />
          </div>
        </div>
      </div>
      <main className={styles.topnavParent}>
        <header className={styles.topnav}>
          <div className={styles.cmaCgmLogo1Parent}>
            <img
              className={styles.cmaCgmLogo1}
              loading="lazy"
              alt=""
              src="/cmacgm-logo-1@2x.png"
            />
            <div className={styles.jackNeelParent}>
              <p className={styles.jackNeel}>Jack Neel</p>
              <img
                className={styles.logout1Icon}
                loading="lazy"
                alt=""
                src="/logout-1.svg"
              />
            </div>
          </div>
        </header>
        <section className={styles.frameWrapper}>
          <div className={styles.frameParent}>
            <div className={styles.documentSearchWrapper}>
              <p className={styles.documentSearch}>Document Search</p>
            </div>
            <div className={styles.frameGroup}>
              <form className={styles.frameContainer}>
                <div className={styles.labelParent}>
                  <div className={styles.label}>Application Type</div>
                  <div className={styles.field}>
                    <div className={styles.text}>Freight Cash Image</div>
                    <div className={styles.iconsWrapper}>
                      <img
                        className={styles.icons1}
                        alt=""
                        src="/icons-1.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.frameDiv}>
                  <div className={styles.labelGroup}>
                    <div className={styles.label1}>IS Create Date</div>
                    <div className={styles.field1}>
                      <div className={styles.text1}>12/12/23</div>
                      <div className={styles.iconsContainer}>
                        <img
                          className={styles.icons2}
                          alt=""
                          src="/icons-2.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.labelContainer}>
                    <div className={styles.label2}>Scan Batch ID</div>
                    <div className={styles.buttonField}>
                      <div className={styles.field2}>
                        <input
                          className={styles.text2}
                          placeholder="Abc232"
                          type="text"
                        />
                      </div>
                      <button className={styles.mainButton}>
                        <div className={styles.buttonContent}>
                          <div className={styles.iconWrapper}>
                            <img
                              className={styles.icon}
                              alt=""
                              src="/icon.svg"
                            />
                          </div>
                          <p className={styles.text3}>Search</p>
                        </div>
                        <img className={styles.icons3} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className={styles.frameParent1}>
                <div className={styles.groupDiv}>
                  <div className={styles.frameParent2}>
                    <div className={styles.rectangleParent}>
                      <div className={styles.frameChild} />
                      <div className={styles.frameWrapper1}>
                        <div className={styles.nameParent}>
                          <div className={styles.name}>Name</div>
                          <img className={styles.vectorIcon} alt="" />
                        </div>
                      </div>
                      <div className={styles.frameParent3}>
                        <div className={styles.statusParent}>
                          <div className={styles.status}>Status</div>
                          <img className={styles.vectorIcon1} alt="" />
                        </div>
                        <div className={styles.createdByParent}>
                          <div className={styles.createdBy}>Created By</div>
                          <img className={styles.vectorIcon2} alt="" />
                        </div>
                      </div>
                      <img className={styles.vectorIcon3} alt="" />
                    </div>
                    <div className={styles.frameItem} />
                  </div>
                  <div className={styles.dateParent}>
                    <div className={styles.date}> Date</div>
                    <img className={styles.vectorIcon4} alt="" />
                  </div>
                  <div className={styles.frameParent4}>
                    <div className={styles.formscheckboxParent}>
                      <input className={styles.formscheckbox} type="checkbox" />
                      <input
                        className={styles.formscheckbox1}
                        type="checkbox"
                      />
                      <input
                        className={styles.formscheckbox2}
                        type="checkbox"
                      />
                      <input
                        className={styles.formscheckbox3}
                        type="checkbox"
                      />
                      <div className={styles.formscheckbox4}>
                        <div className={styles.rectangle} />
                      </div>
                    </div>
                    <div className={styles.edit2Outline1Parent}>
                      <img className={styles.edit2Outline1Icon} alt="" />
                      <div className={styles.msIcondocxParent}>
                        <img className={styles.msIcondocx} alt="" />
                        <div className={styles.sharepointNews}>
                          SharePoint News
                        </div>
                        <div className={styles.docx}>Docx</div>
                        <div className={styles.frameInner} />
                        <div className={styles.karthik}>Karthik</div>
                        <div className={styles.august30}>August 30</div>
                        <div className={styles.new}>New</div>
                        <div className={styles.view1Wrapper}>
                          <img className={styles.view1Icon} alt="" />
                        </div>
                      </div>
                      <div className={styles.msIcondocxGroup}>
                        <img className={styles.msIcondocx1} alt="" />
                        <div className={styles.sharepointNews1}>
                          SharePoint News
                        </div>
                        <div className={styles.xls}>xls</div>
                        <div className={styles.lineDiv} />
                        <div className={styles.karthik1}>Karthik</div>
                        <div className={styles.august301}>August 30</div>
                        <div className={styles.new1}>New</div>
                        <div className={styles.view1Container}>
                          <img className={styles.view1Icon1} alt="" />
                        </div>
                      </div>
                      <div className={styles.msIcondocxContainer}>
                        <img className={styles.msIcondocx2} alt="" />
                        <div className={styles.sharepointNews2}>
                          SharePoint News
                        </div>
                        <div className={styles.pdf}>pdf</div>
                        <div className={styles.frameChild1} />
                        <div className={styles.karthik2}>Karthik</div>
                        <div className={styles.august302}>August 30</div>
                        <div className={styles.new2}>New</div>
                        <div className={styles.view1Frame}>
                          <img className={styles.view1Icon2} alt="" />
                        </div>
                      </div>
                      <div className={styles.msIcondocxParent1}>
                        <div className={styles.msIcondocx3}>
                          <img
                            className={styles.image7Icon}
                            alt=""
                            src="/image-7@2x.png"
                          />
                          <img
                            className={styles.image8Icon}
                            alt=""
                            src="/image-8@2x.png"
                          />
                        </div>
                        <div className={styles.sharepointNews3}>
                          SharePoint News
                        </div>
                        <div className={styles.xls1}>xls</div>
                        <div className={styles.frameChild2} />
                        <div className={styles.karthik3}>Karthik</div>
                        <div className={styles.august303}>August 30</div>
                        <div className={styles.view1Wrapper1}>
                          <img className={styles.view1Icon3} alt="" />
                        </div>
                        <div className={styles.div}>-</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.rectangle1} />
                <button className={styles.mainButton1}>
                  <div className={styles.buttonContent1}>
                    <div className={styles.iconContainer}>
                      <img className={styles.icon1} alt="" src="/icon-1.svg" />
                    </div>
                    <p className={styles.text4}>Download</p>
                  </div>
                  <img className={styles.icons4} alt="" />
                </button>
                <div className={styles.frameParent5}>
                  <div className={styles.frameParent6}>
                    <input className={styles.frameInput} type="checkbox" />
                    <b className={styles.cocd}>COCD</b>
                    <b className={styles.docNumber}>Doc Number</b>
                    <b className={styles.year}>Year</b>
                    <b className={styles.creationDate}>Creation Date</b>
                    <b className={styles.vendorId}>Vendor ID</b>
                    <b className={styles.vendorName}>Vendor Name</b>
                    <b className={styles.postingDate}>Posting Date</b>
                    <b className={styles.documentDate}>Document Date</b>
                    <b className={styles.amountLc}>Amount LC</b>
                    <b className={styles.curr}>Curr</b>
                    <b className={styles.reference}>{`Reference `}</b>
                  </div>
                  <div className={styles.usersParent}>
                    <div className={styles.users1}>
                      <input
                        className={styles.formscheckbox5}
                        type="checkbox"
                      />
                      <div className={styles.container} data-animate-on-scroll>
                        <div className={styles.div1}>123</div>
                        <div className={styles.div2}>12345</div>
                        <div className={styles.div3}>2002</div>
                        <div className={styles.div4}>12/12/2001</div>
                        <div className={styles.abcd023}>Abcd023</div>
                        <div className={styles.jackNeel1}>Jack Neel</div>
                        <div className={styles.div5}>12/12/2001</div>
                        <div className={styles.div6}>12/12/2001</div>
                        <div className={styles.div7}>124</div>
                        <div className={styles.abd345}>Abd345</div>
                        <div className={styles.bcd134}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users2}>
                      <input
                        className={styles.formscheckbox6}
                        type="checkbox"
                      />
                      <div className={styles.parent1} data-animate-on-scroll>
                        <div className={styles.div8}>123</div>
                        <div className={styles.div9}>12345</div>
                        <div className={styles.div10}>2002</div>
                        <div className={styles.div11}>12/12/2001</div>
                        <div className={styles.abcd0231}>Abcd023</div>
                        <div className={styles.jackNeel2}>Jack Neel</div>
                        <div className={styles.div12}>12/12/2001</div>
                        <div className={styles.div13}>12/12/2001</div>
                        <div className={styles.div14}>124</div>
                        <div className={styles.abd3451}>Abd345</div>
                        <div className={styles.bcd1341}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users3}>
                      <input
                        className={styles.formscheckbox7}
                        type="checkbox"
                      />
                      <div className={styles.parent2} data-animate-on-scroll>
                        <div className={styles.div15}>123</div>
                        <div className={styles.div16}>12345</div>
                        <div className={styles.div17}>2002</div>
                        <div className={styles.div18}>12/12/2001</div>
                        <div className={styles.abcd0232}>Abcd023</div>
                        <div className={styles.jackNeel3}>Jack Neel</div>
                        <div className={styles.div19}>12/12/2001</div>
                        <div className={styles.div20}>12/12/2001</div>
                        <div className={styles.div21}>124</div>
                        <div className={styles.abd3452}>Abd345</div>
                        <div className={styles.bcd1342}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users4}>
                      <input
                        className={styles.formscheckbox8}
                        type="checkbox"
                      />
                      <div className={styles.parent3} data-animate-on-scroll>
                        <div className={styles.div22}>123</div>
                        <div className={styles.div23}>12345</div>
                        <div className={styles.div24}>2002</div>
                        <div className={styles.div25}>12/12/2001</div>
                        <div className={styles.abcd0233}>Abcd023</div>
                        <div className={styles.jackNeel4}>Jack Neel</div>
                        <div className={styles.div26}>12/12/2001</div>
                        <div className={styles.div27}>12/12/2001</div>
                        <div className={styles.div28}>124</div>
                        <div className={styles.abd3453}>Abd345</div>
                        <div className={styles.bcd1343}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users5}>
                      <input
                        className={styles.formscheckbox9}
                        type="checkbox"
                      />
                      <div className={styles.parent4} data-animate-on-scroll>
                        <div className={styles.div29}>123</div>
                        <div className={styles.div30}>12345</div>
                        <div className={styles.div31}>2002</div>
                        <div className={styles.div32}>12/12/2001</div>
                        <div className={styles.abcd0234}>Abcd023</div>
                        <div className={styles.jackNeel5}>Jack Neel</div>
                        <div className={styles.div33}>12/12/2001</div>
                        <div className={styles.div34}>12/12/2001</div>
                        <div className={styles.div35}>124</div>
                        <div className={styles.abd3454}>Abd345</div>
                        <div className={styles.bcd1344}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users6}>
                      <input
                        className={styles.formscheckbox10}
                        type="checkbox"
                      />
                      <div className={styles.parent5} data-animate-on-scroll>
                        <div className={styles.div36}>123</div>
                        <div className={styles.div37}>12345</div>
                        <div className={styles.div38}>2002</div>
                        <div className={styles.div39}>12/12/2001</div>
                        <div className={styles.abcd0235}>Abcd023</div>
                        <div className={styles.jackNeel6}>Jack Neel</div>
                        <div className={styles.div40}>12/12/2001</div>
                        <div className={styles.div41}>12/12/2001</div>
                        <div className={styles.div42}>124</div>
                        <div className={styles.abd3455}>Abd345</div>
                        <div className={styles.bcd1345}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users7}>
                      <input
                        className={styles.formscheckbox11}
                        type="checkbox"
                      />
                      <div className={styles.parent6} data-animate-on-scroll>
                        <div className={styles.div43}>123</div>
                        <div className={styles.div44}>12345</div>
                        <div className={styles.div45}>2002</div>
                        <div className={styles.div46}>12/12/2001</div>
                        <div className={styles.abcd0236}>Abcd023</div>
                        <div className={styles.jackNeel7}>Jack Neel</div>
                        <div className={styles.div47}>12/12/2001</div>
                        <div className={styles.div48}>12/12/2001</div>
                        <div className={styles.div49}>124</div>
                        <div className={styles.abd3456}>Abd345</div>
                        <div className={styles.bcd1346}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users8}>
                      <input
                        className={styles.formscheckbox12}
                        type="checkbox"
                      />
                      <div className={styles.parent7} data-animate-on-scroll>
                        <div className={styles.div50}>123</div>
                        <div className={styles.div51}>12345</div>
                        <div className={styles.div52}>2002</div>
                        <div className={styles.div53}>12/12/2001</div>
                        <div className={styles.abcd0237}>Abcd023</div>
                        <div className={styles.jackNeel8}>Jack Neel</div>
                        <div className={styles.div54}>12/12/2001</div>
                        <div className={styles.div55}>12/12/2001</div>
                        <div className={styles.div56}>124</div>
                        <div className={styles.abd3457}>Abd345</div>
                        <div className={styles.bcd1347}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users9}>
                      <input
                        className={styles.formscheckbox13}
                        type="checkbox"
                      />
                      <div className={styles.parent8} data-animate-on-scroll>
                        <div className={styles.div57}>123</div>
                        <div className={styles.div58}>12345</div>
                        <div className={styles.div59}>2002</div>
                        <div className={styles.div60}>12/12/2001</div>
                        <div className={styles.abcd0238}>Abcd023</div>
                        <div className={styles.jackNeel9}>Jack Neel</div>
                        <div className={styles.div61}>12/12/2001</div>
                        <div className={styles.div62}>12/12/2001</div>
                        <div className={styles.div63}>124</div>
                        <div className={styles.abd3458}>Abd345</div>
                        <div className={styles.bcd1348}>Bcd134</div>
                      </div>
                    </div>
                    <div className={styles.users10}>
                      <div className={styles.formscheckbox14}>
                        <div className={styles.rectangle2} />
                      </div>
                      <div className={styles.parent9} data-animate-on-scroll>
                        <div className={styles.div64}>123</div>
                        <div className={styles.div65}>12345</div>
                        <div className={styles.div66}>2002</div>
                        <div className={styles.div67}>12/12/2001</div>
                        <div className={styles.abcd0239}>Abcd023</div>
                        <div className={styles.jackNeel10}>Jack Neel</div>
                        <div className={styles.div68}>12/12/2001</div>
                        <div className={styles.div69}>12/12/2001</div>
                        <div className={styles.div70}>124</div>
                        <div className={styles.abd3459}>Abd345</div>
                        <div className={styles.bcd1349}>Bcd134</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tableHeader}>
                    <div className={styles.frameParent7}>
                      <input className={styles.frameInput1} type="checkbox" />
                      <b className={styles.blNumber}>BL Number</b>
                      <b className={styles.cashReportNumber}>
                        Cash Report Number
                      </b>
                      <b className={styles.documentProcessingStatus}>
                        Document Processing Status
                      </b>
                      <b className={styles.documentType}>Document Type</b>
                      <div className={styles.isCreateDateParent}>
                        <b
                          className={styles.isCreateDate}
                        >{`IS Create Date `}</b>
                        <img
                          className={styles.angleDown1Icon}
                          alt=""
                          src="/angledown-1.svg"
                        />
                      </div>
                      <b className={styles.paymentAmount}>Payment Amount</b>
                      <b className={styles.scanBatchId}>Scan Batch ID</b>
                    </div>
                    <div className={styles.tableHeaderItems}>
                      <div className={styles.users11}>
                        <input
                          className={styles.formscheckbox15}
                          type="checkbox"
                        />
                        <div className={styles.headerItems}>
                          <div className={styles.placeholder}>123</div>
                          <div className={styles.placeholder1}>12345</div>
                          <div className={styles.open}>Open</div>
                          <div className={styles.pdf1}>PDF</div>
                          <div className={styles.placeholder2}>12/12/2001</div>
                          <div className={styles.placeholder3}>$245</div>
                          <div className={styles.abc124}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems1}>
                      <div className={styles.users12}>
                        <input
                          className={styles.formscheckbox16}
                          type="checkbox"
                        />
                        <div className={styles.parent10}>
                          <div className={styles.div71}>123</div>
                          <div className={styles.div72}>12345</div>
                          <div className={styles.open1}>Open</div>
                          <div className={styles.pdf2}>PDF</div>
                          <div className={styles.div73}>12/12/2001</div>
                          <div className={styles.div74}>$245</div>
                          <div className={styles.abc1241}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems2}>
                      <div className={styles.users13}>
                        <input
                          className={styles.formscheckbox17}
                          type="checkbox"
                        />
                        <div className={styles.parent11}>
                          <div className={styles.div75}>123</div>
                          <div className={styles.div76}>12345</div>
                          <div className={styles.open2}>Open</div>
                          <div className={styles.pdf3}>PDF</div>
                          <div className={styles.div77}>12/12/2001</div>
                          <div className={styles.div78}>$245</div>
                          <div className={styles.abc1242}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems3}>
                      <div className={styles.users14}>
                        <input
                          className={styles.formscheckbox18}
                          type="checkbox"
                        />
                        <div className={styles.parent12}>
                          <div className={styles.div79}>123</div>
                          <div className={styles.div80}>12345</div>
                          <div className={styles.open3}>Open</div>
                          <div className={styles.pdf4}>PDF</div>
                          <div className={styles.div81}>12/12/2001</div>
                          <div className={styles.div82}>$245</div>
                          <div className={styles.abc1243}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems4}>
                      <div className={styles.users15}>
                        <input
                          className={styles.formscheckbox19}
                          type="checkbox"
                        />
                        <div className={styles.parent13}>
                          <div className={styles.div83}>123</div>
                          <div className={styles.div84}>12345</div>
                          <div className={styles.open4}>Open</div>
                          <div className={styles.pdf5}>PDF</div>
                          <div className={styles.div85}>12/12/2001</div>
                          <div className={styles.div86}>$245</div>
                          <div className={styles.abc1244}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems5}>
                      <div className={styles.users16}>
                        <input
                          className={styles.formscheckbox20}
                          type="checkbox"
                        />
                        <div className={styles.parent14}>
                          <div className={styles.div87}>123</div>
                          <div className={styles.div88}>12345</div>
                          <div className={styles.open5}>Open</div>
                          <div className={styles.pdf6}>PDF</div>
                          <div className={styles.div89}>12/12/2001</div>
                          <div className={styles.div90}>$245</div>
                          <div className={styles.abc1245}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems6}>
                      <div className={styles.users17}>
                        <input
                          className={styles.formscheckbox21}
                          type="checkbox"
                        />
                        <div className={styles.parent15}>
                          <div className={styles.div91}>123</div>
                          <div className={styles.div92}>12345</div>
                          <div className={styles.open6}>Open</div>
                          <div className={styles.pdf7}>PDF</div>
                          <div className={styles.div93}>12/12/2001</div>
                          <div className={styles.div94}>$245</div>
                          <div className={styles.abc1246}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems7}>
                      <div className={styles.users18}>
                        <input
                          className={styles.formscheckbox22}
                          type="checkbox"
                        />
                        <div className={styles.parent16}>
                          <div className={styles.div95}>123</div>
                          <div className={styles.div96}>12345</div>
                          <div className={styles.open7}>Open</div>
                          <div className={styles.pdf8}>PDF</div>
                          <div className={styles.div97}>12/12/2001</div>
                          <div className={styles.div98}>$245</div>
                          <div className={styles.abc1247}>Abc124</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableHeaderItems8}>
                      <div className={styles.users19}>
                        <input
                          className={styles.formscheckbox23}
                          type="checkbox"
                        />
                        <div className={styles.parent17}>
                          <div className={styles.div99}>123</div>
                          <div className={styles.div100}>12345</div>
                          <div className={styles.open8}>Open</div>
                          <div className={styles.pdf9}>PDF</div>
                          <div className={styles.div101}>12/12/2001</div>
                          <div className={styles.div102}>$245</div>
                          <div className={styles.abc1248}>Abc124</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Search;
