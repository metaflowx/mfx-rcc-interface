'use client'

import Heading from "@/theme/components/heading"
import { Box, Grid, Typography } from "@mui/material"

interface CardItem {
    id: number;
    title: string;
    text: string;
    data: string;
}

interface StatscardProps {
    cardData: CardItem[];
}

const Statscard = ({ cardData }: StatscardProps) => {
    return (
        <Box>
            <Grid container spacing={2}>
                {cardData.map((item) => (
                    <Grid key={item.id} item lg={4} md={4} sm={12} xs={12}>
                        <Box data-aos="flip-left" sx={{
                            border: '1px solid #557804',
                            padding: '0.5rem',
                            borderRadius: '20px',
                        }}>
                            <Box sx={{
                                background: 'linear-gradient(85deg, #557804, #557804)',
                                padding: '0.6rem',
                                borderRadius: '5rem',
                                textAlign: 'center',
                                color: '#fff'
                            }}>
                                {item.text}
                            </Box>
                            <Box sx={{
                                textAlign: 'center',
                                padding: '1rem'
                            }}>
                                <Heading heading={`${item.title} RCC`} variantt="h5" />
                                <Typography color="#999999">$ {item.data}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Statscard
