import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((them) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        flexDirection: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        color: 'rgba(0, 183, 255, 1)'
    },
    image: {
        marginLeft: '15px'
    },
    [them.breakpoints.down("sm")]: {
        mainContainer: {
            flexDirection: "column-reverse"
        }
    }
}))