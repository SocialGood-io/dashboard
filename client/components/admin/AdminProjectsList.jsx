AdminProjectsList = React.createClass({
	deleteProjects(){
		// console.log(this.props.project._id)
		Meteor.call('deleteProject', this.props.project._id, (err) =>{
			if(err)
				Bert.alert('Error while deleting projects :- ' + err.reason , 'danger', 'growl-top-right');
			else
				Bert.alert('Project deleted successfully.', 'success', 'growl-top-right' );
		})
	},
	/*updateProjects(){
	},*/
	render(){
		return(
			<tr key={this.props.project._id}>
				<td>{this.props.project && this.props.project.title ? this.props.project.title :''}</td>
				<td>{this.props.project && this.props.project.direct_beneficiaries ? this.props.project.direct_beneficiaries :''}</td>
				<td>
					{
						this.props.project && this.props.project.grantee ?
							this.props.project.grantee.map((value, index)=>{
								return(
									<span key={index}>
										Name: {value.name}<br/>
										Link: <a href={value.link} target="_blank">{value.link}</a><br/>
									</span>
								)
							})
						:''
					}
				</td>
				<td>
					{
						this.props.project && this.props.project.partners ?
							this.props.project.partners.map((value, index) =>{
								return(
									<span key={index}>
										Name: {value.name}<br/>
										Link: <a href={value.link} target="_blank">{value.link}</a><br/>
									</span>
								)
							})
						:''
					}
				</td>
				<td className="tags">
					{
						this.props.project && this.props.project.tags ?
							this.props.project.tags.map((tag, index)=>{
								return <a href="javascript:void(0)" key={index} className="admin-prj-tags">{tag}</a>
							})
						:''
					}
				</td>
				<td>
					{
						this.props.project && this.props.project.technical_providers ?
							this.props.project.technical_providers.map((value, index)=>{
								return(
									<span key={index}>
										Name: {value.name}<br/>
										Link: <a href={value.link} target="_blank">{value.link}</a><br/>
									</span>
								);
							})
						:''
					}
				</td>
				<td>{this.props.project && this.props.project.createdAt ? this.props.project.createdAt.toString() :''}</td>
				<td><a href={FlowRouter.path('adminUpdateProject',{id:this.props.project._id})} style={{textDecoration: "none"}}><i className="fa fa-edit" aria-hidden="true"></i></a>&nbsp;<a href="" style={{textDecoration: "none"}} onClick={this.deleteProjects}><i className="fa fa-trash" aria-hidden="true"></i></a></td>
			</tr>
		);
	}
})