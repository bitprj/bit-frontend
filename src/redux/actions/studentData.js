import { cloneDeep } from 'lodash'

import StudentService from "../../services/StudentService";
// import ContentfulService from "../../services/ContentfulService";

import * as actionTypes from "../actions/actionTypes";

const studentService = new StudentService();
// const contentfulService = new ContentfulService();

export const setStudentData = studentData => {
    return {
        type: actionTypes.SET_STUDENT_DATA,
        studentData
    };
};

export const initStudentData = () => {
    return dispatch => {
        studentService.getStudentInfo().then(fetchedStudentData => {
            const studentData = cloneDeep(fetchedStudentData);
            dispatch(setStudentData(studentData));
        });
    };
};

export const setCurrentTrack = currentTrack => {
    return {
        type: actionTypes.SET_CURRENT_TRACK,
        currentTrack
    };
};

export const initCurrentTrack = currentTrackID => {
    return dispatch => {
        studentService.getTrack(currentTrackID).then(trackData => {
            const currentTrack = cloneDeep(trackData);
            // contentfulService.fetch(trackData.contentfulID).then(cTrackData => {
            //   console.log("backend_fetchTrack", trackData)
            //   console.log("contentful_fetchTrack", cTrackData); // used for more info about each topic
            // });
            dispatch(setCurrentTrack(currentTrack));
        });
    };
};

export const setCurrentTopic = currentTopic => {
    return {
        type: actionTypes.SET_CURRENT_TOPIC,
        currentTopic
    };
};

export const initCurrentTopic = currentTopicID => {
    return dispatch => {
        studentService.getTopic(currentTopicID).then(topicData => {
            const currentTopic = cloneDeep(topicData);
            dispatch(setCurrentTopic(currentTopic));
            // return topicData;
        });
        // .then(() => {
        //   contentfulService.fetch("6E5Pfi5Le18r1yJ481oGiB").then(response => {
        //     console.log("response: ", response); // used for more info about each topic
        //     // currentTopic.modules = { ...cTopicData.modules };

        //     dispatch(setCurrentTopic(currentTopic));
        //   });
        // });
    };
};

export const setSuggestedActivity = suggestedActivity => {
    return {
        type: actionTypes.SET_SUGGESTED_ACTIVITY,
        suggestedActivity
    };
};

export const initSuggestedActivity = suggestedActivityID => {
    return dispatch => {
        let suggestedActivity = {};
        studentService.getActivity(suggestedActivityID).then(activityData => {
            suggestedActivity = cloneDeep(activityData);
            dispatch(setSuggestedActivity(suggestedActivity));
        });
    };
};
