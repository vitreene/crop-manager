import React from 'react';
import ChoixCadrage from './choix-cadrage'
import Upload from './upload'

export default function Sources({children, seCadre, getUrl, getCadre}) {
        return(
            <main className="element-wrapper">
                <aside className="element-sources">
                    <Upload {...{getUrl}}/>
                    <ChoixCadrage {...{seCadre, getCadre}}/>
                </aside>
                {children}
            </main>
        )
    }

