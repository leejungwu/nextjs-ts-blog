import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/Layout';
import wrapper from '../store/configureStore';
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';
import { Tag } from 'antd';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { RootState } from '../interface/rootstate';

const Wrapper = styled.div`
  margin: 30px;
`;

const columns = [
  {
    title: '학교',
    dataIndex: '학교',
    key: '학교',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: '전공',
    dataIndex: '전공',
    key: '전공',
  },
  {
    title: '기간',
    dataIndex: '기간',
    key: '기간',
  },
  {
    title: '구분',
    key: '구분',
    dataIndex: '구분',
    render: (tags:any) => (
      <>
        {tags.map((tag:any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          // if (tag === '중퇴') {
          //   color = 'volcano';
          // }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data = [
  {
    학교: '대구가톨릭대학교 사범대학부속 무학고등학교',
    전공: '',
    기간: '2010. 3 ~ 2013. 2',
    구분: ['졸업'],
  },
  {
    학교: '',
    전공: '',
    기간: '2014. 10. 27 ~ 2016. 7.26',
    구분: ['해병대 전역'],
  },
  {
    학교: '대구가톨릭대학교',
    전공: '컴퓨터공학',
    기간: '2017. 3 ~ 2021. 2',
    구분: ['졸업', '3.58 / 4.5'],
  },
  {
    학교: 'Angelo State University',
    전공: 'Computer Science',
    기간: '2019. 1 ~ 2019. 5',
    구분: ['교환학생'],
  },
];

const Profile: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { mainPosts, loadPostsLoading } = useSelector((state:RootState)=> state.post);
  if (mainPosts.length == 0 && loadPostsLoading == false) {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Layout>
        <Wrapper>
          <h1 style={{ textAlign: 'center' }}>Profile</h1>
          <article id="f7d4cc9f-9ec6-4581-9cd7-9de217a6dd75" className="page sans">
            <div className="page-body">
              <h1 id="ad7f736c-9c33-4e4f-baee-0100a6b2ef85" className="">
                <mark className="highlight-blue">About Me</mark>
              </h1>
              <hr id="d4a1166a-3eb4-4da4-a93e-9e26795f8370"/>
              <div id="42c800f4-3260-4f9d-862f-617982204fa8" className="column-list">
                <div id="b28d5c88-f945-472f-8a3c-7cd676c4f7c6" style={{ width: '37.5%'}} className="column">
                  <h3 id="2d071076-56f3-48c5-899f-94c60a696a58" className="">
                    Introduction
                  </h3>
                </div>
                <div id="52ba94c0-aad7-4362-a36a-491935dfca29" style={{ width: '62.5%' }} className="column">
                  <ul id="65de9c12-8471-4fa8-b394-4458daf5d94e" className="bulleted-list">
                    <li>이정우</li>
                  </ul>
                  <ul id="f6c6ada7-71a2-4f98-bcb8-169a29715b6b" className="bulleted-list">
                    <li>1995년 1월 11일생</li>
                  </ul>
                  {/* <ul id="4d03db83-f280-4957-9a67-f1922ccc0259" className="bulleted-list">
                    <li>꾸준하게 자기개발하는 개발자</li>
                  </ul>
                  <ul id="902553d0-cb13-4281-9054-2c9f9b3d5681" className="bulleted-list">
                    <li>성능개선에 대해 항상 고민하는 개발자</li>
                  </ul> */}
                  <p id="fd2b1d80-0d0b-4380-9de1-a8c2feeab4d5" className=""></p>
                </div>
              </div>
              <div id="9cbff7e3-3438-450e-ab11-b528bb5663ca" className="column-list">
                <div id="a61c4c0f-a592-426b-83a9-5a074b49c1bd" style={{width: "43.75%"}} className="column">
                  <h3 id="30fd9693-b047-4471-9db6-5d6c9696d4f8" className="">Contact &amp; Channel</h3>
                </div>
                <div id="a3e071fc-07e1-4409-b0f1-804c131d06fb" style={{width: "56.25%"}} className="column">
                  <ul id="ee339d68-04c5-47f4-a477-c407f6a451c3" className="bulleted-list">
                    <li>Email | ljw538@naver.com</li>
                  </ul>
                <hr id="19a32205-ea7b-4b87-b701-9cd6d40d98ba"/>
                <ul id="dab6307d-b211-4df7-a04a-382c9576f4d3" className="bulleted-list">
                  <li>Github | <a href="https://github.com/leejungwu">https://github.com/leejungwu</a></li>
                </ul>
                {/* <ul id="6b9be42e-24e0-4f34-8351-64ce18b4d596" className="bulleted-list">
                  <li>Blog | <a href="https://ljw538.tistory.com">https://ljw538.tistory.com</a></li>
                </ul> */}
                <ul id="00038aa6-d7be-4d36-92a9-99b1b32b9317" className="bulleted-list">
                  <li>010-8250-8811</li>
                </ul>
              </div>
            </div>
            <p id="e8fc00d4-3d93-4c37-b237-34d2ae725ad6" className=""></p>
            <h1 id="6787268b-1d7f-4e3c-b9c1-5555f6980b80" className="">
              <mark className="highlight-blue">Skills</mark>
            </h1>
            <hr id="98052ddf-f573-4f86-88b3-2f2bde178faf"/>
            <div id="5f1089c4-7743-46a4-9790-5e60fb88b420" className="column-list">
              <div id="a1823429-246c-4add-a7cc-e2f5e11a65a9" style={{width: "43.75%"}} className="column">
                <h3 id="726217f0-180b-4e63-b618-5973b14cd6c7" className="">Backend</h3>
              </div>
              <div id="14891eff-dbf7-4348-94f4-aa05e5a1705c" style={{width: '56.25%'}} className="column">
              <ul id="89c92f59-6663-44d2-897c-5d945c50eab8" className="bulleted-list">
                <li>Node.js</li>
              </ul>
              <ul id="70bb1d3b-f43c-45e6-bd93-021ec80b6480" className="bulleted-list">
                <li>Typescript</li>
              </ul>
              <ul id="4f4d5950-65cc-4652-978a-9cd80e07f9ae" className="bulleted-list">
                <li>Nestjs</li>
              </ul>
            </div>
          </div>
          <div id="dcbc6ac3-e09b-4f0a-85c3-7498ce5b8c30" className="column-list">
            <div id="bcc338c9-a1ac-46ab-ac95-919427960f78" style={{width: "43.75%"}} className="column">
              <h3 id="2332bfd3-38e7-4e29-b31a-83c917c5f947" className="">Frontend</h3>
            </div>
            <div id="bf7b67b3-5ee2-4a1c-a261-140004b6790e" style={{width: '56.25%'}} className="column">
              <ul id="9ca52456-29af-4f04-a60e-564069e24a0c" className="bulleted-list">
                <li>HTML5, CSS3, JS(ES6)</li>
              </ul>
              <ul id="986f8aeb-5c89-42a2-9de0-2414322f5fd8" className="bulleted-list">
                <li>Typescript</li>
              </ul>
              <ul id="09151930-ac97-4a62-9f63-a658eac7079d" className="bulleted-list">
                <li>React</li>
              </ul>
              <ul id="da05a269-c795-44f9-bc03-601fa91d6278" className="bulleted-list">
                <li>Redux</li>
              </ul>
            </div>
          </div>
          <div id="9e4fe191-38fe-4805-a546-1f29d918eb6f" className="column-list">
            <div id="336b7d2a-d81b-448f-8508-9748c74d8143" style={{width: "43.75%"}} className="column">
              <h3 id="c4d3af20-cdab-4144-9eab-0374160cca1e" className="">DevOps</h3>
            </div>
            <div id="0ef35c12-74ac-4494-b8ef-dd4f48d7bf34" style={{width: '56.25%'}} className="column">
              <ul id="22c2a560-0c89-49b7-ac76-765c344fe4f5" className="bulleted-list">
                <li>AWS EC2</li>
              </ul>
              <ul id="be38fff2-443f-4cbc-9d8d-34543ccdacde" className="bulleted-list">
                <li>Nginx</li>
              </ul>
              <ul id="ce4b5063-82b3-4e1a-aaa7-fd52ee67793b" className="bulleted-list">
                <li>MySQL</li>
              </ul>
            </div>
          </div><p id="96835fee-f110-4536-895c-f80fec0782a6" className=""></p>
          <h1 id="5080fd56-ad70-460d-af35-a62de10374b8" className="">
            <mark className="highlight-blue">Personal Projects</mark>
          </h1>
          <hr id="786b70de-d0c5-47f6-b9f6-d62e3c35dfb8"/>
          <div id="f235f424-0ea4-4c29-8bc5-c247616e1f95" className="column-list">
            <div id="8059d249-990d-4dd0-9cd3-57298f6eb2a1" style={{width: '50%'}} className="column">
              <h3 id="dcc281a5-dcfe-4c4e-a6ab-96ac78b4e460" className="">JW BLOG</h3>
              <p id="b0eddb32-35d3-4a31-bee5-38ecca6a2b3f" className="">
                <a href="https://jdoub.me">https://jdoub.me</a>
              </p>
              <p id="6b14ec80-7181-4aef-a07e-bedfdbc7c585" className="">
                <a href="https://github.com/leejungwu/nextjs-ts-blog">https://github.com/leejungwu/nextjs-ts-blog</a>
              </p>
              <p id="2a862c68-0c31-4308-b62a-ad9d14b7f105" className="">2021.05.01 ~ 진행 중</p>
            </div>
          <div id="8ed5af46-edda-4554-8527-76b4cd54afab" style={{width: '50%'}} className="column">
            <ul id="5e865cae-4d5b-408a-80a8-f959bf13254c" className="bulleted-list">
              <li>블로그 프로젝트</li>
            </ul>
            <ul id="78920cbc-dd3f-4b90-b3e4-f64380c311cc" className="bulleted-list">
              <li>Frontend
                <ul id="cc186176-bd20-4368-876b-ef22c1add1bf" className="bulleted-list">
                  <li>Typescript</li>
                </ul>
                <ul id="8027e419-9169-4add-98b7-db3850dcd06d" className="bulleted-list">
                  <li>Next.js</li></ul><ul id="8d82f0dc-5503-42c6-812d-f42de590efb8" className="bulleted-list">
                    <li>Redux saga, next-redux-saga</li>
                </ul>
                <ul id="a76fe756-1fd1-44fa-b027-d19d48873725" className="bulleted-list">
                  <li>Styled-Component, ant design, bootstrap, material-ui</li>
                </ul>
              </li>
            </ul>
            <ul id="fe5d8526-48f8-460b-ab0f-11b0f77255b6" className="bulleted-list">
              <li>Backend
                <ul id="ec66d8f0-fee0-411e-bc79-d8e9a588a08f" className="bulleted-list">
                  <li>Typescript</li>
                </ul>
                <ul id="4c32d3b6-16b9-4e65-9f9a-1343f40e26b4" className="bulleted-list">
                  <li>MySQL</li>
                </ul>
              </li>
            </ul>
            </div>
          </div>
          {/* <div id="65b54ce7-eacb-48ec-a899-05bdc9101730" className="column-list">
            <div id="ae067b44-d330-4bdc-97ed-1d6967210be5" style={{width: '50%'}} className="column">
              <h3 id="4b0056c9-1a21-4d08-b866-adc222c1fc2e" className="">
                학과동아리 I-keeper
              </h3>
              <p id="a0a5b5f6-b43e-4af5-b94a-92470a7e4659" className="">2017.03 ~ 2017.12</p>
            </div>
            <div id="98cb7233-feec-4295-af5a-2c4e06b6f849" style={{width: '50%'}} className="column">
              <ul id="e8ef4f80-cbee-4aa8-a9c2-19789179ff9f" className="bulleted-list">
                <li>교내 개발보안 동아리 활동
                  <ul id="bcd6ad39-fce4-4a5f-ac36-cd23c04e611a" className="bulleted-list">
                    <li>자료구조 및 언어 스터디</li>
                  </ul>
                  <ul id="8c60583b-8a4d-45ca-a3e6-43f51016d1b4" className="bulleted-list">
                    <li>웹 취약점 분석 후 카페 포스팅</li>
                  </ul>
                  <ul id="9b6e5e7c-f529-4941-a660-70af8109d75d" className="bulleted-list">
                    <li>교내외 대학정보보호동아리연합회 세미나  참여</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div id="661678ba-0dd3-4d03-a2bc-859d15d17baa" className="column-list">
            <div id="75baf949-007c-4a56-8b11-9a58479e3533" style={{width: '50%'}} className="column">
              <h3 id="1c3ec236-eddd-4c86-a8bc-ad17b5ba72f5" className="">
                SW중심대학 단기 인턴십
              </h3>
              <p id="7d5b166a-4b12-4693-88cc-2e9aeb9b6dfc" className="">지주소프트 </p>
              <p id="05a39766-87b7-4466-aca7-1c7d32635959" className="">2019.08.01 ~ 2019.08.30</p>
            </div>
            <div id="dff3546c-884a-4a67-83b2-7c77dcb45430" style={{width: '50%'}} className="column">
              <ul id="9c96f37b-1ea0-4eae-afb2-fc0554bdf9b6" className="bulleted-list">
                <li>알고리즘 교육 서비스 기업 지주소프트에서 알고리즘 문제 해설 영상 제작 및 알고리즘 문제풀이</li>
              </ul>
            </div>
          </div>
          <div id="67d8f476-eb62-4be4-8f6b-81119bf64135" className="column-list">
            <div id="a8b55ad3-8b07-46fd-a6f0-58e412b9e27b" style={{width: '50%'}} className="column">
              <h3 id="fa37f056-09dc-4a78-a75e-b5fc4e9c87f5" className="">
                학점연계 SW인턴십
              </h3>
              <p id="d2708a59-ed0a-498c-b6d6-1b61c0ed3444" className="">경북IT융합산업기술원 SW연구팀</p>
              <p id="2bc85809-da1f-41b7-98ff-49d34b68cfb8" className="">2020.08.02 ~ 2020.12.04</p>
            </div>
            <div id="77d1a841-f49c-4d80-8847-50e64266c5b3" style={{width: '50%'}} className="column">
              <ul id="082dcc07-fcf4-4b09-8f0a-f25cdc246f2d" className="bulleted-list">
                <li>Node.js 기반의 회사 소개 및 직원용 게시판 사이트 개발</li>
              </ul>
            <p id="237e2bc8-7eaa-4e9f-a05b-9cc9e21b4fb3" className=""></p>
          </div>
        </div> */}
        {/* <h1 id="de132420-8918-4cff-ac15-3927f3100614" className="">
          <mark className="highlight-blue">Education</mark>
        </h1>
        <hr id="0a3d7a48-7fcc-4fde-8f51-4ff7307fe6a4"/>
        <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
        <h1 id="6644a0df-cb2f-410c-86b6-9fb85ef8fe61" className="">
          <mark className="highlight-blue">Certificate</mark>
        </h1>
        <hr id="fcbf4d6c-ab74-4593-ac0a-0055610d5030"/>
        <div id="c0acb5b0-c9e9-4399-bb0a-1f3e60ab111f" className="column-list">
          <div id="26fc74fd-5ba9-4be9-823e-f8a46a3a5fcb" style={{width: "43.75%"}} className="column">
            <h3 id="2c3fc57a-c3ee-4d00-9d35-337007aa6833" className="">정보처리기사</h3>
          </div>
          <div id="1936824a-352a-4183-9b81-f9261ce71008" style={{width: '56.25%'}} className="column">
            <ul id="73a9cc2b-c38d-4bda-97c2-566062cff4ec" className="bulleted-list">
              <li>2020.12.31 취득</li>
            </ul>
          </div>
        </div>
        <div id="d91c2e31-1696-4d8b-be71-ccdef258c0bb" className="column-list">
          <div id="201e9705-5063-4f4a-938b-ff6ff195a8e9" style={{width: "43.75%"}} className="column">
            <h3 id="003d4442-0027-4ba3-99f1-8532ed832dd5" className="">TOEIC 825점</h3>
          </div>
          <div id="ac9e7b71-e9a7-4276-b167-51e44781fc1c" style={{width: '56.25%'}} className="column">
            <ul id="36b762f2-f232-4e52-bd73-17cfbe3a72bc" className="bulleted-list">
              <li>2019.09.08 취득</li>
            </ul>
          </div>
        </div>
        <div id="d91c2e31-1696-4d8b-be71-ccdef258c0bb" className="column-list">
          <div id="201e9705-5063-4f4a-938b-ff6ff195a8e9" style={{width: "43.75%"}} className="column">
            <h3 id="003d4442-0027-4ba3-99f1-8532ed832dd5" className="">OPIc im2</h3>
          </div>
          <div id="ac9e7b71-e9a7-4276-b167-51e44781fc1c" style={{width: '56.25%'}} className="column">
            <ul id="36b762f2-f232-4e52-bd73-17cfbe3a72bc" className="bulleted-list">
              <li>2021.10.08 취득</li>
            </ul>
          </div>
        </div> */}
        <p id="7696d149-cc5f-44c1-81ae-4e529a3a7a18" className=""></p>
        </div>
      </article>
        </Wrapper>        
      </Layout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie: '';
  axios.defaults.headers.Cookie = '';  
  if (context.req && cookie) {                  
    axios.defaults.headers.Cookie = cookie;     
  };
  context.store.dispatch({      
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);      
  await context?.store?.sagaTask?.toPromise();
});

export default Profile