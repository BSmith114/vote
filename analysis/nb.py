import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# creates pandas data frames for 2016 results
vote = pd.read_csv('data/vote.csv')
vote = vote[vote['election'] == 2016]   

# set national votes
dem_pop_vote = vote['dem'].sum()
rep_pop_vote = vote['rep'].sum()
other_pop_vote = vote['other'].sum()
dem_natl_percent = vote['dem'].sum() / vote['total'].sum()
rep_natl_percent = vote['rep'].sum() / vote['total'].sum()
other_natl_percent = vote['other'].sum() / vote['total'].sum()

vote['natl_dem_margin_difference'] = vote['dem_percent'] - dem_natl_percent 

# set state totals
state_totals = vote[['state', 'total']].groupby(by=['state']).sum()
state_totals.reset_index(inplace=True)

# join state totals
vote = vote.merge(state_totals, on='state')
vote.rename(columns={'total_y': 'state_total', 'total_x': 'total'}, inplace=True)

# set vote index on fips after column joins
vote.set_index('fips', inplace=True)

# read cvap csv for population estimates and create fips index
population = pd.read_csv('data/cvap.csv')
population['fips'] = population['GEOID'].str[-5:] 
population['fips'] = pd.to_numeric(population['fips']) 
population.set_index('fips', inplace=True)

# calculate estimated turnout rate
cvap = population[population['LNNUMBER'] == 1] # 1 is for all demographics 
cvap.rename(columns={'CVAP_EST': 'cvap'}, inplace=True)
vote['turnout'] = vote['total'] / cvap['cvap']

# calculate voting age demographics
race = population[['LNNUMBER', 'CVAP_EST']].query("LNNUMBER != 1").pivot(columns='LNNUMBER', values='CVAP_EST')
total = population['CVAP_EST'][population['LNNUMBER'] == 1]
race = race.divide(total, axis=0)
colrename = {
    4: 'black',
    7: 'white',
    13: 'hispanic'
}
race.rename(columns=colrename, inplace=True)
vote = vote.merge(race[['black','white','hispanic']], left_index=True, right_index=True)

# creates population density series
population = pd.read_csv('data/population.csv', index_col='fips')
area = pd.read_csv('data/area.csv')
area.set_index('fips', inplace=True)
vote['pop_density'] = population['2016'] / area.area

def vote_scatter(df, state):
    state_df = df[df['state'] == state]
    plt.scatter(state_df['dem_percent_margin_shift'], state_df['other_percent_shift'], s=((state_df.total / state_df.state_total)) * 3000)
    plt.show()
