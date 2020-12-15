import React from 'react';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ColdChainIcon, UgandaIcon } from '../../../../../../icons/icons';

const Card = ({
  metric,
  metric2,
  backgroundImage,
  title,
  sign,
  isLoading,
  isPercentage,
  icon,
  module,
  type,
}) => {
  return (
    <Paper
      style={{
        width: module === 'coldchain' ? '100%' : '70%',
        height: '100%',
        padding: 10,
        backgroundImage: backgroundImage,
      }}
    >
      {type === 'advanced' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 20,
                color: '#ffff',
              }}
            >
              {icon === 'UGMap' ? (
                <UgandaIcon style={{ fontSize: 'xxx-large' }} />
              ) : (
                <ColdChainIcon style={{ fontSize: 'xxx-large' }} />
              )}
            </span>

            <div
              style={{
                display: 'flex',
                flexDirection: metric2 ? '' : 'column',
                flex: metric2 ? 1 : '',
                justifyContent: metric2 ? 'space-evenly' : '',
              }}
            >
              {isLoading ? (
                <span>
                  <CircularProgress
                    style={{
                      width: 30,
                      height: 30,
                      color: '#ffff',
                      marginTop: 20,
                      marginRight: 20,
                    }}
                  />
                </span>
              ) : (
                <>
                  <span style={{ fontSize: 'xx-large', color: '#fff' }}>
                    {isPercentage ? (
                      <>
                        {metric}%
                        {metric2 ? (
                          <span
                            style={{
                              fontSize: 'large',
                              letterSpacing: 3,
                              paddingLeft: 5,
                            }}
                          >
                            DVS
                          </span>
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      <> {metric} </>
                    )}
                  </span>
                  {metric2 ? (
                    <span style={{ fontSize: 'xx-large', color: '#fff' }}>
                      {isPercentage ? (
                        <>
                          {metric2}%
                          <span
                            style={{
                              fontSize: 'large',
                              letterSpacing: 3,
                              paddingLeft: 5,
                            }}
                          >
                            HF
                          </span>
                        </>
                      ) : (
                        <> {metric2} </>
                      )}
                    </span>
                  ) : (
                    <> </>
                  )}

                  <span
                    style={{
                      textTransform: 'uppercase',
                      letterSpacing: 5,
                      color: 'hsla(0,0%,100%,.5)',
                    }}
                  >
                    {sign}
                  </span>
                </>
              )}
            </div>
          </div>
          <h3 style={{ color: '#ffff', fontWeight: 300 }}>{title}</h3>{' '}
        </>
      ) : (
        <>
          <h3 style={{ color: '#ffff', fontWeight: 300 }}>{title}</h3>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              style={{
                display: 'flex',
                color: '#ffff',
              }}
            >
              {metric} @ Nationality
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '20px',
            }}
          >
            <span
              style={{
                display: 'flex',
                color: '#ffff',
              }}
            >
              85% @ DVS
            </span>
            <span
              style={{
                display: 'flex',
                color: '#ffff',
              }}
            >
              75% @ HF
            </span>
          </div>
        </>
      )}
    </Paper>
  );
};

export default Card;
