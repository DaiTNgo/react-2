import React from "react";

type Props = any;

function Logo({ level }: { level: number }) {
    const bgColor = ["#ed1c24", "#009ada", "#50b748", "#fdb913"];
    return (
        <div>
            <svg
                id="fpr_g1_logo"
                xmlns="http://www.w3.org/2000/svg"
                width="259.504"
                height="27.897"
                viewBox="0 0 259.504 27.897"
            >
                <g id="Group_1415" data-name="Group 1415">
                    <g
                        id="Group_1412"
                        data-name="Group 1412"
                        transform="translate(126.497 1.247)"
                    >
                        <g id="Group_1410" data-name="Group 1410">
                            <path
                                id="Path_733"
                                data-name="Path 733"
                                d="M456.4,214.374l9.062,1.067-1.067-2.134,2.774-2.134,8.748,11.309-11.1,9.815-2.347-2.56,1.28-1.494-8.108-.427s3.013-3.884.322-8c0,0,.278-2.806.431-5.438"
                                transform="translate(-454.925 -210.655)"
                                fill="none"
                            />
                            <path
                                id="Path_734"
                                data-name="Path 734"
                                d="M463.174,231.653l-2.815-3.07,1-1.172-8.062-.424.431-.559a6.7,6.7,0,0,0,.305-7.575l-.071-.109.013-.13c0-.028.279-2.83.43-5.424l.023-.392,8.77,1.033-.9-1.793,3.308-2.545,9.187,11.875Zm-1.825-3.087,1.88,2.051,10.563-9.344-8.311-10.742-2.239,1.723,1.238,2.474-9.354-1.1c-.135,2.173-.344,4.385-.4,4.933a7.376,7.376,0,0,1-.046,7.759l8.221.433Z"
                                transform="translate(-453.302 -209.493)"
                                fill={bgColor[level]}
                            />
                        </g>
                        <g
                            id="Group_1411"
                            data-name="Group 1411"
                            transform="translate(3.846 6.351)"
                        >
                            <path
                                id="Path_735"
                                data-name="Path 735"
                                d="M468.626,239c-1.5,0-1.922-1.236-1.922-2.509,0-.786.137-2.084.224-2.871l-1.161-.075.1-1.173,1.236-.05.475-2.246,1.1.038-.274,2.246h2.047v1.3h-2.221a19,19,0,0,0-.25,2.871c0,.749.25,1.335.724,1.335.586,0,.874-.7.886-1.148h1.049a2.037,2.037,0,0,1-2.01,2.284"
                                transform="translate(-465.768 -230.078)"
                                fill={bgColor[level]}
                            />
                            <path
                                id="Path_736"
                                data-name="Path 736"
                                d="M484.03,244.656a2.553,2.553,0,0,1-2.809-2.583,2.683,2.683,0,0,1,2.809-2.771,2.678,2.678,0,1,1,0,5.355M484,240.524a1.485,1.485,0,1,0,0,2.971,1.489,1.489,0,0,0,1.5-1.6,1.4,1.4,0,0,0-1.5-1.373"
                                transform="translate(-476.453 -236.455)"
                                fill={bgColor[level]}
                            />
                        </g>
                    </g>
                    <path
                        id="Path_722"
                        data-name="Path 722"
                        d="M513.03,225.473l1.554-.028-.288-10.961a12.687,12.687,0,0,0-1.467.144l-.086-3.8A33.2,33.2,0,0,1,521,209.678c5.9,0,8.948,2.791,8.948,6.387a6.944,6.944,0,0,1-3.338,6.186,45,45,0,0,0,3.484,6.967l2.331-.115.143,3.625a52.842,52.842,0,0,0-6.243.489,53.263,53.263,0,0,1-4.232-9.758,8.417,8.417,0,0,1-1.582.172l.057,1.64.489-.028.115,3.51-8.027.23Zm8.545-11.278a8.66,8.66,0,0,0-1.381.144c0,1.5.058,3.6.115,5.092a7.836,7.836,0,0,0,.806.029c2.675,0,3.164-1.611,3.164-2.762,0-1.122-.431-2.5-2.7-2.5"
                        transform="translate(-367.907 -208.374)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_723"
                        data-name="Path 723"
                        d="M575.876,240.525c-3.942.058-7.653-2.273-7.653-6.962,0-4.488,3.481-7.193,7.883-7.193,3.942,0,6.56,2.244,6.56,6.3a5.876,5.876,0,0,1-.086.978l-7.855,1.151c.2.691.95,1.209,2.158,1.209A6.646,6.646,0,0,0,581,234.483l2.187,2.5a9.437,9.437,0,0,1-7.308,3.539m.374-10.328a1.99,1.99,0,0,0-2.042,2.129l3.97-.546a1.98,1.98,0,0,0-1.928-1.582"
                        transform="translate(-406.269 -219.916)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_724"
                        data-name="Path 724"
                        d="M635.29,227.2l-.058,3.654h-1.554c-.029,2.388,0,4.373,0,6.732l1.64-.086.116,3.74-6.445.23-.345-1.295a5.589,5.589,0,0,1-3.453,1.18c-4.258,0-7.077-2.56-7.077-6.9,0-4.92,3.51-7.336,6.991-7.336,1.956,0,3.251.575,4,1.582l.057-1.554Zm-9.466,4.028a2.585,2.585,0,0,0-2.618,2.733,2.509,2.509,0,0,0,2.56,2.618,2.386,2.386,0,0,0,2.561-2.5,2.547,2.547,0,0,0-2.5-2.848"
                        transform="translate(-440.768 -220.432)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_725"
                        data-name="Path 725"
                        d="M682.451,210.281l9.235-.23.058,3.079-1.669.058c.087,5.092.029,9.12.058,14.1h1.784l-.115,3.165-5.956.086-.288-2.388a6,6,0,0,1-3.567,1.036c-4.057,0-7.049-2.014-7.049-6.646,0-4.8,3.251-6.962,6.617-6.962a4.73,4.73,0,0,1,3.25,1.036c-.028-.863-.028-1.985-.114-3.309l-2.187.058Zm.028,9.436c-1.381,0-2.445,1.18-2.445,2.906a2.644,2.644,0,0,0,2.5,2.819,2.769,2.769,0,0,0,2.446-2.791c0-1.813-.834-2.935-2.5-2.935"
                        transform="translate(-480.062 -208.632)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_726"
                        data-name="Path 726"
                        d="M731.181,217.608l7.048.316a52.847,52.847,0,0,0-.172,8.516h1.927v3.539H731.21V226.44h1.727a42.52,42.52,0,0,1,.086-5.754h-1.928Zm4.517-.719a2.671,2.671,0,0,1-2.848-2.733,2.637,2.637,0,0,1,2.791-2.7,2.582,2.582,0,0,1,2.848,2.532,2.688,2.688,0,0,1-2.791,2.906"
                        transform="translate(-518.89 -209.6)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_727"
                        data-name="Path 727"
                        d="M761.883,228.351l6.7-.086.058,1.611a4.674,4.674,0,0,1,3.568-1.64c5.006,0,6.3,3.941,6.3,6.876,0,.748-.058,2.014-.115,3.251h1.409v3.568h-7.94v-3.568H773.1c.057-1.064.115-2.043.115-2.848,0-1.956-.346-3.453-1.583-3.453a3.062,3.062,0,0,0-2.7,1.842c.057.69.173,2.445.258,4.517l1.7-.057.115,3.654-8.861.288-.116-3.654,1.986-.058-.288-6.559h-1.755Z"
                        transform="translate(-540.179 -221.206)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_728"
                        data-name="Path 728"
                        d="M829.933,222.122l-.4,1.193a7.039,7.039,0,0,0-3.6-1.109,7.219,7.219,0,0,0-5.543,1.943,7.321,7.321,0,0,0-2.081,4.935,6.532,6.532,0,0,0,1.673,4.783,7.057,7.057,0,0,0,5,2.142,4.653,4.653,0,0,0,3.2-.927c0,.007,0,.014,0,.022-.02,1.47-.073,5.376-3.089,5.7a5.224,5.224,0,0,1-4.182-1.644l-.126-.118-2.2,2.947.088.094a8.52,8.52,0,0,0,6.034,2.784q.278.012.549.012c4.45,0,7.313-2.441,7.518-6.465,0-.082.465-8.1.646-12.18l1.618-.016.046-3.9Zm-4.141,9.812a2.576,2.576,0,0,1-2.242-2.506,2.631,2.631,0,0,1,2.331-2.68l.079,0,.058,0a2.323,2.323,0,0,1,2.18,2.618l0,.109A2.575,2.575,0,0,1,825.792,231.934Z"
                        transform="translate(-579.187 -216.978)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_737"
                        data-name="Path 737"
                        d="M144.948,223.429l1.992-.082-.246-9.715c-.573.055-1.119.137-1.774.246l-.109-4.175a22.493,22.493,0,0,1,7.2-1.147c5.895,0,8.951,2.565,8.951,6.522,0,4.2-2.838,7.45-9.006,6.8l.082,1.283,2.347-.082.109,3.657-9.442.355Zm8.076-10.234a5.305,5.305,0,0,0-1.556.246l.109,4.285a4.659,4.659,0,0,0,.846.082c2.456,0,2.92-1.337,2.92-2.429a2.046,2.046,0,0,0-2.32-2.183"
                        transform="translate(-113.494 -207.598)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_738"
                        data-name="Path 738"
                        d="M194.677,205.669l8.515-.218.055,3.084-1.938.109.136,4.476a3.728,3.728,0,0,1,2.838-1.283c4.285,0,5.513,3.084,5.513,7.232a19.784,19.784,0,0,1-.136,2.019l.982.027-.164,3.357-7.5-.328.164-3.357,1.528.082c.054-.737.082-1.419.082-2.1,0-1.883-.464-2.7-1.692-2.7-1.037,0-1.637.846-1.637,2.047s0,2.1-.027,3l1.037.027-.055,3.193-7.86-.164.055-3.193,1.637.027c.082-4.367.191-8,.027-12.281l-1.5.027Z"
                        transform="translate(-147.861 -205.451)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_739"
                        data-name="Path 739"
                        d="M252.949,238.73c-3.793,0-7.041-2.129-7.041-6.522,0-3.93,3.548-6.058,7.014-6.058,3.712,0,6.768,2.183,6.768,6.386,0,3.793-3.411,6.195-6.741,6.195m-.109-8.842c-1.419,0-2.238.955-2.238,2.565a2.173,2.173,0,0,0,2.129,2.4c1.446,0,2.211-1.173,2.211-2.647a2.069,2.069,0,0,0-2.1-2.32"
                        transform="translate(-183.399 -219.764)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_740"
                        data-name="Path 740"
                        d="M289.869,225.285l6.359-.082.054,1.528a4.434,4.434,0,0,1,3.384-1.556c4.749,0,5.977,3.739,5.977,6.522,0,.709-.055,1.91-.109,3.084h1.337v3.384h-7.532v-3.384h1.174c.055-1.01.109-1.938.109-2.7,0-1.855-.327-3.274-1.5-3.274a2.9,2.9,0,0,0-2.565,1.746c.055.655.164,2.32.246,4.285l1.61-.054.109,3.466-8.406.273-.109-3.466,1.883-.055-.273-6.222h-1.665Z"
                        transform="translate(-213.796 -219.09)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_741"
                        data-name="Path 741"
                        d="M346.937,213.494l6.686.3a50.129,50.129,0,0,0-.164,8.078h1.829v3.357h-8.324v-3.357H348.6a40.3,40.3,0,0,1,.082-5.458h-1.828Zm4.285-.682a2.533,2.533,0,0,1-2.7-2.593,2.5,2.5,0,0,1,2.647-2.565,2.449,2.449,0,0,1,2.7,2.4,2.549,2.549,0,0,1-2.647,2.756"
                        transform="translate(-253.2 -206.974)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_742"
                        data-name="Path 742"
                        d="M386.565,228.73a6.163,6.163,0,0,1-6.168,5.212c-4.858,0-7.1-3.3-7.1-7.068,0-4.366,2.674-7.177,6.386-7.177a5.254,5.254,0,0,1,4.066,1.474l.218-1.665h2.593l.054,5.239-3.821.956a2.356,2.356,0,0,0-2.456-1.829,2.539,2.539,0,0,0-2.319,2.784c0,1.774,1.091,2.975,2.51,2.975a2.758,2.758,0,0,0,2.32-1.965Z"
                        transform="translate(-271.488 -215.17)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_743"
                        data-name="Path 743"
                        d="M418.335,228.261h2.456a3.081,3.081,0,0,0,2.92,1.556.542.542,0,0,0,.574-.573c0-1.556-5.54-1.146-5.54-5.567,0-3,2.511-4.175,4.585-4.175a4.793,4.793,0,0,1,3.466,1.01l.328-1.446h2.183l-.272,4.094-2.046.518a4.992,4.992,0,0,0-2.4-.682.645.645,0,0,0-.682.6c0,1.365,5.812.628,5.812,5.24,0,3.029-1.8,4.421-4.5,4.421-2.211,0-3.493-.464-4.421-1.992v1.856h-2.456Z"
                        transform="translate(-302.627 -214.864)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_744"
                        data-name="Path 744"
                        d="M871.495,264.461h1.71v.252h-.713v1.854h-.284v-1.854h-.713Z"
                        transform="translate(-615.973 -246.255)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_745"
                        data-name="Path 745"
                        d="M879.6,266.567v-1.244c0-.061.006-.328.006-.525H879.6l-.592,1.768h-.282l-.592-1.765h-.006c0,.193.006.46.006.522v1.244h-.275v-2.106h.408l.6,1.78h.006l.6-1.78h.4v2.106Z"
                        transform="translate(-620.375 -246.255)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_729"
                        data-name="Path 729"
                        d="M48.149,230.585v-1.434l-3,.032-.032,3.729h1.371v.8H43.385l-.016-.8h.892l-.032-8.541h-.908l-.016-.8,6.087-.079-.1,2.8h-.8l.016-1.848-3.394.016.064,3.84,2.964-.016v-1.227h.8v3.522Z"
                        transform="translate(-43.305 -217.927)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_730"
                        data-name="Path 730"
                        d="M64.838,232.832l.255,3.028c.223-1.769,1.323-2.868,2.263-2.868a1.5,1.5,0,0,1,.972.287l-.08,2.295h-.494c0-1.195-.191-1.53-.605-1.53-.781,0-1.482,1.354-1.88,2.757l.191,2.741,1.5-.08.032.8-3.521.191-.032-.8,1.163-.064c-.1-1.545-.35-4.526-.494-5.976h-.94v-.8Z"
                        transform="translate(-57.038 -224.373)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_731"
                        data-name="Path 731"
                        d="M83.076,241.146a2.965,2.965,0,0,1-3.2-3.235,3.11,3.11,0,0,1,3.171-3.315,3.036,3.036,0,0,1,3.171,3.267,3.068,3.068,0,0,1-3.139,3.282m0-5.8A2.375,2.375,0,0,0,80.8,237.88a2.257,2.257,0,1,0,4.477-.016,2.229,2.229,0,0,0-2.2-2.518"
                        transform="translate(-68.591 -225.605)"
                        fill={bgColor[level]}
                    />
                    <path
                        id="Path_732"
                        data-name="Path 732"
                        d="M111.2,239.575l1.02.032-.016.749-3.314-.128v-.717l1.418.048a15.6,15.6,0,0,0,.239-2.486c0-2.231-.733-3.426-1.753-3.426-1.721,0-2.071,1.578-2.071,3.474v2.438l1.323-.048.016.781-3.314.064-.032-.749,1.116-.032.016-2.821c0-2.008-.175-3.075-1.338-3.075a2.042,2.042,0,0,0-1.912,1.912c0,.08-.016,2.327-.064,4.032l1.243-.048.031.781-3.314.1-.032-.749,1.1-.032c.032-1.913.032-3.984-.032-6.119l-1.2.032v-.749l2.088-.064.064,1.8a2.346,2.346,0,0,1,2.215-1.753c.765,0,1.418.606,1.689,1.625a2.656,2.656,0,0,1,2.55-1.7c2.215,0,2.486,2.263,2.486,4.127a17.453,17.453,0,0,1-.223,2.709"
                        transform="translate(-82.735 -224.32)"
                        fill={bgColor[level]}
                    />
                </g>
            </svg>
        </div>
    );
}

export default Logo;
