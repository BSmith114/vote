import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sqlalchemy import create_engine

# create sql alchemy engine
engine = create_engine('postgresql://appservice:password@localhost/vote')
con = engine.connect()

# sets sql queries as strings
with open('queries/query.sql', encoding='utf-8-sig') as f:
    qry = f.read()
    election = pd.read_sql(qry, con, index_col='fips') 

# demographics based on cvap fips, white, black, latino
with open('queries/demographics.sql', encoding='utf-8-sig') as f:
    qry = f.read()
    demographics = pd.read_sql(qry, con, index_col='fips')
    demographics = pd.crosstab(demographics.index, demographics.linenumber, demographics.total, aggfunc=np.sum) 

# merge all tables
election = pd.merge(election, demographics, left_index=True, right_index=True)
migration = pd.read_csv('data/migration.csv', index_col='fips')
election = election.merge(migration, right_index=True, left_index=True)

# close sql connection
con.close()