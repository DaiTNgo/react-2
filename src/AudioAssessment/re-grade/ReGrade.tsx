import React, { useCallback, useState } from 'react';
import { useAudioAssessmentContext } from '../ContextAudioAssessment';
import {
    getContentHeaderFooter,
    getDirections,
    getListWord,
} from '../utils/convertLayout';
import { ResponseDefault } from '../grade/type';
import { getPhonicsAssessmentType, getScore } from '../grade/utils';
import Select, { ISelectOption } from '../../components/select/select';
import { useImmer } from 'use-immer';
import { className, sendToParent } from '../../helper';
import { ACTION_POST_MESSAGE } from '../../enums/action';
import styles from '../grade/grade.module.scss';
import { VIEW_GRADE } from '../../enums/view-grade';
import { SIndex } from '../styled/view';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Table from '../../components/table';
import Check from '../../Icons/Check';
import XMark from '../../Icons/XMark';
import { getResultData } from './utils';
import { useColumnsGrade } from '../hooks/useColumnsGrade';
import { OPTIONS_SURVEY } from '../../enums/survey';
import Audio from '../../components/Audio';
import IconSync from '../../Icons/Sync';
import { Button } from '../../components/button';

type Props = any;

function ReGrade({}: Props) {
    const { data, urlRecordStudent } = useAudioAssessmentContext();
    const { direction: componentDirection, pathAudio } = getDirections(
        data as ResponseDefault
    );
    const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);
    const phonicsAssessmentType = getPhonicsAssessmentType(
        data as ResponseDefault
    );

    const [selectedId, setSelectedId] = useState<number>(() => {
        return data.speedScore || -1;
    });

    const [dataSource, setDataSource] = useImmer(() => {
        return getResultData(data);
    });

    const columns = useColumnsGrade({
        setDataSource,
        phonicsAssessmentType,
    });

    const { score, accuracy, fluency } = getScore(dataSource);

    const handleSubmit = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_GRADING,
            body: {
                gradingResults: dataSource,
                speedScore: selectedId,
                score,
                fluencyScore: fluency,
                accuracyScore: accuracy,
                isReGrading: true,
            },
        });
    };

    const listScore = [
        {
            label: 'Score',
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>SCORE</p>
                    <div className={styles.ScoreNum}>{score}</div>
                </div>
            ),
            hidden:
                phonicsAssessmentType !==
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            label: 'Accuracy Score',
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>Accuracy Score</p>
                    <div className={styles.ScoreNum}>{accuracy}</div>
                </div>
            ),
            hidden:
                phonicsAssessmentType ===
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            label: 'Fluency Score',
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>Fluency Score</p>
                    <div className={styles.ScoreNum}>{fluency}</div>
                </div>
            ),
            hidden: phonicsAssessmentType !== VIEW_GRADE.FLUENCY_CHECK,
        },
        {
            label: 'Speed',
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>SPEED</p>
                    <Select
                        onClick={(select: ISelectOption) => {
                            setSelectedId(select.value);
                        }}
                        selectedId={selectedId}
                        defaultOption={{
                            label: 'Select',
                            value: -1,
                            key: -1,
                        }}
                        options={[
                            { label: 'Slow/labored', value: 1, key: 1 },
                            { label: 'Moderate', value: 2, key: 2 },
                            { label: 'Fast', value: 3, key: 3 },
                        ]}
                    />
                </div>
            ),
        },
    ].filter((rc) => !rc?.hidden);

    const handleSyncAudio = useCallback(() => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_GET_SYNC_AUDIO,
        });
    }, []);

    return (
        <SIndex>
            <Layout
                footer={<Footer content={contentHeaderFooter} />}
                header={<Header content={contentHeaderFooter} />}
            >
                <div className='flex items-start gap-1 fpr__directions'>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: componentDirection,
                        }}
                    />
                </div>
                {(data.assignment.surveyImplementOption ===
                    OPTIONS_SURVEY.LEVEL_ONE.SELF_GUIDED ||
                    data.assignment.surveyImplementOption ===
                        OPTIONS_SURVEY.LEVEL_TWO.WITH_RECORD) && (
                    <div className={'fpr-audio'}>
                        <p className={'fpr-audio__title'}>Recorded Content</p>
                        <div className={'flex items-center gap-4 mt-2'}>
                            <Audio src={urlRecordStudent} />
                            {data.assignment.surveyImplementOption ===
                                OPTIONS_SURVEY.LEVEL_TWO.WITH_RECORD && (
                                <button
                                    className={styles.Sync}
                                    onClick={handleSyncAudio}
                                >
                                    <IconSync fill={'white'} width={18} />
                                    <p>Sync</p>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <Table dataSource={dataSource} columns={columns} />

                <div className={'flex items-center mt-4'}>
                    {listScore.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {item.component}
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className={'mt-8'}></div>
                <Button
                    needLoading
                    className={styles.Save}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Layout>
        </SIndex>
    );
}

export default ReGrade;
