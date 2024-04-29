function Filter() {

    return(
        <div className="container wrapper">

            <br>
                <h2>Very Lightweight Portfolio Filter for Bootstrap</h2>
                <hr>
                    <div className="pull-right">
                        <button className="btn btn-small btn-primary" data-toggle="portfilter" data-target="all">
                            All
                        </button>
                        <button className="btn btn-small btn-primary" data-toggle="portfilter" data-target="art">
                            Art
                        </button>
                        <button className="btn btn-small btn-primary" data-toggle="portfilter" data-target="media">
                            Media
                        </button>
                        <button class="btn btn-small btn-primary" data-toggle="portfilter" data-target="brand">
                            Brand
                        </button>
                    </div>
                </hr>
            </br>
        </div>
                );
}