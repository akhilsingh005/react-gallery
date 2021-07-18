import Button from "@material-ui/core/Button";
import { createStyles, Icon, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";

export default function Pagination(props: any) {
  const [pageNo, setPageNo] = useState(1);
  const [jumpToPage, setJumpToPage] = useState(1);
  const [noOfRecords, setNoOfRecords] = useState(20);

  useEffect(() => {
    props.getMacintosheGroupPhotos(pageNo, noOfRecords);
  }, [pageNo]);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(1),
      },
    })
  );

  const classes = useStyles();

  return (
    <div className="pagination-outer">
      <div className="pagination-left-outer">
        <div className="page-count">{`Showing page ${pageNo} of ${props.totalPages}`}</div>
        <div className="goto-page">
          <div>Go to page</div>
          <div>
            <input type="number" onChange={ (e)=> { setJumpToPage(+e.target.value)}}/>
          </div>
          <div>
          <Button
            variant="contained"
            color="secondary"
            className={`${classes.button} go-btn`}
            size="small"
            onClick={()=> { setPageNo(jumpToPage)}}
          >
          Go
        </Button>
            {/* <button onClick={()=> { setPageNo(jumpToPage)}}>Go</button> */}
          </div>
        </div>
      </div>
      <div className="pagination-right-outer">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          // endIcon={<Icon>send</Icon>}
          onClick={()=> { setPageNo(pageNo -1)}}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          // endIcon={<Icon>send</Icon>}
          onClick={()=> { setPageNo(pageNo + 1)}}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
