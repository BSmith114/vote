import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# etl for raw csv pres-vote
# read source csv
vote = pd.read_csv('data/pres-vote.csv')

# clean up party to only democrat, repubican and other
vote.party = vote.party.str.replace('.*democrat.*', 'democrat', case=False)
vote.party = vote.party.str.replace('.*republican.*', 'republican', case=False)
vote.party = vote.party.str.replace('^(?!.*(republican|democrat)).*$', 'other', case=False)

# pivots table for each election
elections = vote.election.unique().tolist()
dfs = []
for election in elections:
    df = vote.query('election == @election')
    df = df.pivot_table(index='fips', columns='party', values='votes', aggfunc='sum')
    df['election'] = election
    dfs.append(df)

vote = pd.concat(dfs)
vote.reset_index(inplace=True)

# create fips for county, state names
fips = pd.read_csv('data/fips.csv')
vote = vote.merge(fips, on='fips')

# re-orders and sorts
vote = vote[['fips','county','state','election','democrat','republican','other']]
vote.sort_values(['fips', 'election'], inplace=True)
vote[['democrat','republican','other']] = vote[['democrat','republican','other']].fillna(0)
vote['total'] = vote.democrat + vote.republican + vote.other

# resets and drops additinoal index column
vote.reset_index(inplace=True)
vote.drop('index', axis=1, inplace=True)

# sets counts as ints
vote[['democrat','republican','other', 'total']] = vote[['democrat','republican','other', 'total']].astype(int)

# calculates vote percent
vote = vote.join(vote[['democrat', 'republican', 'other']].div(vote.total, axis=0), rsuffix='_percent')

# sets previous year differene by fips
vote = vote.join(vote[['fips','democrat', 'republican', 'other', 'total']].groupby(['fips']).diff(), rsuffix='_diff').fillna(0)
vote = vote.join(vote[['fips','democrat_percent', 'republican_percent', 'other_percent']].groupby(['fips']).diff(), rsuffix='_diff').fillna(0)
vote[['democrat_diff', 'other_diff', 'republican_diff', 'total_diff']] = vote[['democrat_diff', 'other_diff', 'republican_diff', 'total_diff']].astype(int)

# add dem margin columns
vote['democrat_margin'] = vote.democrat - vote.republican
vote['democrat_margin_diff'] = vote[['fips', 'democrat_margin']].groupby('fips').diff().fillna(0).astype(int)

vote['democrat_margin_percent'] = vote.democrat_percent - vote.republican_percent 
vote['democrat_margin_percent_diff'] = vote[['fips', 'democrat_margin_percent']].groupby('fips').diff().fillna(0) 