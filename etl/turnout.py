import os
import numpy as np 
import pandas as pd 
import vote

'''
cleans up raw cvap file from census for 2016
'''

# reads cvs into dataframe
cvap = pd.read_csv(os.path.join('..','raw-data','cvap-2016.csv'))

# creates new CVAP columns fips and election
cvap['fips'] = cvap['GEOID'].str[-5:].astype(int)
cvap['election'] = 2016 
cvap = cvap[['fips','election','CVAP_EST']]

# filtes cvap to total voters
cvap = cvap.query('LNNUMBER == 1')

# resets index
cvap.reset_index(inplace=True)

# merge vote df with cvap est 
vote = pd.merge(vote.vote, cvap, on=['fips', 'election'], how='left')
vote['turnout'] = vote.total / vote.CVAP_EST
vote = vote.drop('CVAP_EST', axis=1)
