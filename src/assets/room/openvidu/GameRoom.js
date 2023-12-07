import { OpenVidu } from 'openvidu-browser';
import { useRef, useEffect, useState, useCallback } from 'react';
import '@tensorflow/tfjs-backend-webgl';
import UserVideoComponent from './UserVideoComponent';
// import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// https://togedong.kro.kr/

// const APPLICATION_SERVER_URL =
// process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

// const APPLICATION_SERVER_URL =
// process.env.NODE_ENV === 'production' ? '' : 'https://togedong.kro.kr/';

export default function GameRoom() {
  const location = useLocation();
  const roomTitle = location.state.roomTitle;
  const myName = location.state.roomManager;
  const sessionId = location.state.roomId;
  const myToken = location.state.connectionToken;

  console.log(myToken);
  const [mySessionId, setMySessionId] = useState(roomTitle);
  const [myUserName, setMyUserName] = useState(myName);
  const [session, setSession] = useState(sessionId);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const OV = useRef(new OpenVidu());

  // const handleChangeSessionId = useCallback((e) => {
  //   setMySessionId(e.target.value);
  // }, []);

  // const handleChangeUserName = useCallback((e) => {
  //   setMyUserName(e.target.value);
  // }, []);

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager],
  );

  useEffect(() => {
    joinSession(); // 컴포넌트가 마운트되면 joinSession 함수를 호출합니다.
  }, []);

  const joinSession = useCallback(async () => {
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });
    try {
      await mySession.connect(myToken, { clientData: myName });
      setSession(mySession);
    } catch (error) {
      console.log('There was an error connecting to the session:', error);
    }
  }, [myToken, myName]);

  // useEffect(() => {
  //   if (session) {
  //     // Get a token from the OpenVidu deployment
  //     getToken().then(async (token) => {
  //       try {
  //         await session.connect(token, { clientData: myUserName });

  //         let publisher = await OV.current.initPublisherAsync(undefined, {
  //           audioSource: undefined,
  //           videoSource: undefined,
  //           publishAudio: true,
  //           publishVideo: true,
  //           resolution: '640x480',
  //           frameRate: 30,
  //           insertMode: 'APPEND',
  //           mirror: false,
  //         });

  //         session.publish(publisher);

  //         const devices = await OV.current.getDevices();
  //         const videoDevices = devices.filter(
  //           (device) => device.kind === 'videoinput',
  //         );
  //         const currentVideoDeviceId = publisher.stream
  //           .getMediaStream()
  //           .getVideoTracks()[0]
  //           .getSettings().deviceId;
  //         const currentVideoDevice = videoDevices.find(
  //           (device) => device.deviceId === currentVideoDeviceId,
  //         );

  //         setMainStreamManager(publisher);
  //         setPublisher(publisher);
  //         setCurrentVideoDevice(currentVideoDevice);
  //       } catch (error) {
  //         console.log(
  //           'There was an error connecting to the session:',
  //           error.code,
  //           error.message,
  //         );
  //       }
  //     });
  //   }
  // }, [session, myUserName]);
  // const url = new URL(myToken);
  // const params = new URLSearchParams(url.search);
  // const token = params.get('token');

  useEffect(() => {
    const connectToSession = async () => {
      if (session) {
        // 이미 있는 토큰 사용
        console.log(session);
        try {
          await session.connect(myToken, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput',
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId,
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        }
      }
    };
    connectToSession();
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('');
    setMyUserName('username');
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  // const getToken = useCallback(async () => {
  //   return createSession(mySessionId).then((sessionId) =>
  //     createToken(sessionId),
  //   );
  // }, [mySessionId]);

  // const createSession = async (sessionId) => {
  //   const response = await axios.post(
  //     APPLICATION_SERVER_URL + 'api/sessions',
  //     { customSessionId: sessionId },
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   );
  //   return response.data; // The sessionId
  // };

  // const createToken = async (sessionId) => {
  //   const response = await axios.post(
  //     APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
  //     {},
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   );
  //   return response.data; // The token
  // };

  return (
    <Container>
      {/* {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img
              src="resources/images/openvidu_grey_bg_transp_cropped.png"
              alt="OpenVidu logo"
            />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null} */}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <RoomTitle>{mySessionId}</RoomTitle>
            <input type="button" onClick={leaveSession} value="방 나가기" />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Container>
  );
}

const Container = styled.div``;

const RoomTitle = styled.h1`
  font-size: 300px;
`;
